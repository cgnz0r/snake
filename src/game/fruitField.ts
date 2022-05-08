import { settings } from "../constants/settings";
import { ICoords } from "../interfaces";
import { CanvasElement } from "./canvasElement";

const FRUITS_QTY_AT_MOMENT = 2

let mockFruitsStack = [
    { x: settings.CELL_SIZE * 5, y: settings.CELL_SIZE },
    { x: settings.CELL_SIZE, y: settings.CELL_SIZE * 2 },
    { x: settings.CELL_SIZE, y: settings.CELL_SIZE },
    { x: settings.CELL_SIZE * 6, y: settings.CELL_SIZE * 7 },
    { x: settings.CELL_SIZE * 3, y: settings.CELL_SIZE * 3 },
    { x: settings.CELL_SIZE * 8, y: settings.CELL_SIZE * 2 }, 
    { x: 0, y: 0 }
]

export class FruitField extends CanvasElement {
    private _fruitPositionList: Array<ICoords>

    constructor(context: CanvasRenderingContext2D) {
        super(context)

        this._fruitPositionList = this._spawnFruits(FRUITS_QTY_AT_MOMENT)
    }

    /**
     * Draws fruits
     */
    public draw(): void {
        console.log('fruits :: draw', [...this._fruitPositionList])
        super.updateFillStyle(settings.FRUIT_COLOR)
        this._fruitPositionList.forEach(this.drawCell.bind(this))
    }

    /**
     * Fruit eating check
     * @param position Snake's head position
     * @returns true if snake eating fruit
     */
    public checkEating(position: ICoords): boolean {
        const fruitIdx = this._fruitPositionList.findIndex(fruitPositionItem => 
            fruitPositionItem.x === position.x
            && fruitPositionItem.y === position.y
        )

        if (fruitIdx !== -1) {
            this._updateFruitPositionList([
                ...this._fruitPositionList.slice(0, fruitIdx), 
                ...this._fruitPositionList.slice(1 + fruitIdx)
            ])
            return true
        }

        return false
    }

    private _updateFruitPositionList(fruitPositionList: Array<ICoords>): void {
        if (fruitPositionList.length < FRUITS_QTY_AT_MOMENT) {
            fruitPositionList.push(...this._spawnFruits(FRUITS_QTY_AT_MOMENT - fruitPositionList.length))
        }

        this._fruitPositionList = fruitPositionList
    }

    private _spawnFruits(fruitsQty: number): Array<ICoords> {
        const arr = mockFruitsStack.slice(0, fruitsQty)
        mockFruitsStack = mockFruitsStack.slice(fruitsQty)
        return arr;
    }
}