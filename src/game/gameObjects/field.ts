import { settings } from "../../constants/settings"
import { ICoords } from "../../interfaces"
import { FruitList } from "./fruitList"

// background and fruits management
export class Field {
    fruitList: FruitList
    occupiedSlots: Array<ICoords>

    constructor() {
        this.fruitList = new FruitList();

        this.occupiedSlots = [ settings.INITIAL_SNAKE_POSITION ]

        this._spawnFruits(settings.FRUITS_QTY_AT_MOMENT)
    }

    public draw(): void {
        // this.fruitList.draw()
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

    private _getFreeSlots(): Array<ICoords> {
        const freeSlots: Array<ICoords> = []
        for (let x = 0; x < settings.DIMENSION; x++) {
            for (let y = 0; y < settings.DIMENSION; y++ ) {
                const currSlotCoords = { x, y }
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
            const idx = randomize(0, freeSlots.length - 1)

            this.fruitList.add(freeSlots[idx])

            freeSlots.splice(idx, 1)
        }
    }
}