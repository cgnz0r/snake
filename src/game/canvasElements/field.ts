import { settings } from "../../constants/settings"
import { ICoords } from "../../interfaces"
import { CanvasElement } from "./canvasElement"
import { FruitList } from "./fruitList"

let mockFruitsStack: Array<ICoords> = [
    { x: settings.CELL_SIZE * 5, y: settings.CELL_SIZE },
    { x: settings.CELL_SIZE, y: settings.CELL_SIZE * 2 },
    { x: settings.CELL_SIZE, y: settings.CELL_SIZE },
    { x: settings.CELL_SIZE * 6, y: settings.CELL_SIZE * 7 },
    { x: settings.CELL_SIZE * 3, y: settings.CELL_SIZE * 3 },
    { x: settings.CELL_SIZE * 8, y: settings.CELL_SIZE * 2 }, 
    { x: 0, y: 0 }
]

// background and fruits management
export class Field extends CanvasElement {
    fruitList: FruitList
    occupiedSlots: Array<ICoords>

    constructor(context: CanvasRenderingContext2D) {
        super(context)

        this.fruitList = new FruitList(context);

        this.occupiedSlots = [ settings.INITIAL_SNAKE_POSITION ]

        this._spawnFruits(settings.FRUITS_QTY_AT_MOMENT)
    }

    public draw(): void {
        this._drawBackPart()
        this._drawFrontPart()
        this.fruitList.draw()
    }

    /**
     * Updates inner ocuppied array and notifies about collapse
     * @param slots Snake's slots on field
     * @returns Collapse flag :: if snake ate fruit it returns true; otherwise false
     */
    public updateOccupiedSlots(slots: Array<ICoords>): boolean {
        this.occupiedSlots.splice(0, this.occupiedSlots.length -1, ...slots)
        const isFruitEaten = this.fruitList.has(slots[0])

        if (isFruitEaten) {
            this.fruitList.remove(slots[0])
            this._spawnFruits(1)
        }

        return isFruitEaten
    }

    // background
    private _drawBackPart(): void {
        super.updateFillStyle(settings.BACKGROUND_COLOR)
        this.context.fillRect(0, 0, settings.CANVAS_SIZE, settings.CANVAS_SIZE)
    }

    // cells
    private _drawFrontPart(): void {
        super.updateFillStyle(settings.BACKGROUND_CELL_COLOR)
    
        for (let i = 0; i < settings.DIMENSION; i++) {
            for (let j = 0; j < settings.DIMENSION; j++ ) {
                super.drawCell({
                    x: settings.CELL_SIZE * i,
                    y: settings.CELL_SIZE * j
                })
            }
        }
    }

    private _getFreeSlots(): Array<ICoords> {
        const freeSlots: Array<ICoords> = []
        for (let i = 0; i < settings.DIMENSION; i++) {
            for (let j = 0; j < settings.DIMENSION; j++ ) {
                const currSlotCoords = {
                    x: settings.CELL_SIZE * i,
                    y: settings.CELL_SIZE * j
                }
                const isCurrSlotOccupied = this.occupiedSlots.some(slotCoords => 
                    slotCoords.x === currSlotCoords.x
                    && slotCoords.y === currSlotCoords.y
                )
                const isCurrSlotFruit = this.fruitList.has(currSlotCoords)

                if (!isCurrSlotOccupied && !isCurrSlotFruit) {
                    freeSlots.push(currSlotCoords)
                }
            }
        }
        
        return freeSlots
    }

    private _spawnFruits(fruitsQty: number): void {
        const freeSlots = this._getFreeSlots();

        const randomize = (min: number, max: number) => Math.round((Math.random() * (max - min)) + min)

        for (let i = 0; i < fruitsQty; i++) {
            if (mockFruitsStack.length === 0) return

            const idx = randomize(0, freeSlots.length - 1)

            this.fruitList.add(freeSlots[idx])

            freeSlots.splice(idx, 1)
        }
    }
}