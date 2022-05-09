import { settings } from "../../constants/settings"
import { ICoords } from "../../interfaces"
import { CanvasElement } from "./canvasElement"
import { Fruit } from "./fruit"

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
    fruitList: Array<Fruit> = []
    occupiedSlots: Array<ICoords> = []

    constructor(context: CanvasRenderingContext2D) {
        super(context)

        const spawnedFruits = this._spawnFruits(settings.FRUITS_QTY_AT_MOMENT)
        if (spawnedFruits) this._updateFruitList(spawnedFruits as Array<Fruit>)
    }

    public draw(): void {
        this._drawBackPart()
        this._drawFrontPart()
        this.fruitList.forEach(fruit => fruit.draw())
    }

    public updateOccupiedSlots(slots: Array<ICoords>): boolean {
        const poedenniyFruit = this.fruitList.find(fruit => {
            const fruitPosition = fruit.getPosition()
            return fruitPosition.x === slots[0].x && fruitPosition.y === slots[0].y
        })
        if (poedenniyFruit) {
        // test replace after
            const poedenniyPosition = poedenniyFruit.getPosition();
            const fruitIdx = this.fruitList.findIndex(fruit => {
                const fruitPosition = fruit.getPosition();

                return fruitPosition.x === poedenniyPosition.x && fruitPosition.y === poedenniyPosition.y
            })

            this._updateFruitList([
                ...this.fruitList.slice(0, fruitIdx), 
                ...this.fruitList.slice(1 + fruitIdx)
            ])

            return true
        }

        return false
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

    private _updateFruitList(fruitList: Array<Fruit>): void {
        if (fruitList.length < settings.FRUITS_QTY_AT_MOMENT) {
            const spawnQty = settings.FRUITS_QTY_AT_MOMENT - fruitList.length
            const spawnedFruits = this._spawnFruits(spawnQty)
            if (spawnedFruits) fruitList.push(...spawnedFruits as Array<Fruit>)
        }

        this.fruitList = fruitList
    }

    private _spawnFruits(fruitsQty: number): Array<Fruit> | boolean {
        const spawnedFruits = []
        for (let i = 0; i < fruitsQty; i++) {
            if (mockFruitsStack.length === 0) return false

            spawnedFruits.push(new Fruit(this.context, mockFruitsStack.shift()!))
        }

        return spawnedFruits
    }
}