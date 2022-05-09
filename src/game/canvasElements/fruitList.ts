import { settings } from "../../constants/settings";
import { ICoords } from "../../interfaces";
import { CanvasElement } from "./canvasElement";
import { FruitItem } from "./fruitItem";

export class FruitList extends CanvasElement {
    fruitList: Array<FruitItem>

    constructor(context: CanvasRenderingContext2D) {
        super(context)

        this.fruitList = []
    }

    /**
     * Draws fruits
     */
    public draw(): void {
        this.fruitList.forEach(fruit => fruit.draw())
    }

    getLength(): number {
        return this.fruitList.length
    }

    /**
     * Checks for fruit existance by coords
     * @param {ICoords} fruitCoords Fruit coords
     * @returns isExist flag
     */
    public has(fruitCoords: ICoords): boolean {
        return this.fruitList.some(fruit => {
            const currFruitCoords = fruit.getCoords()
            return currFruitCoords.x === fruitCoords.x 
                && currFruitCoords.y === fruitCoords.y
        })
    }

    /**
     * Adds fruit by coords
     * @param {ICoords} fruitCoords Fruit Coords
     */
    public add(fruitCoords: ICoords): void {
        const fruit = new FruitItem(this.context, fruitCoords)
        this.fruitList.push(fruit)
    }

    /**
     * Removes fruit for list by coords
     * @param {ICoords} fruitCoords Fruit coords
     */ 
    public remove(fruitCoords: ICoords): void {
        const removeIdx = this.fruitList.findIndex(fruit => {
            const currFruitCoords = fruit.getCoords()
            return currFruitCoords.x === fruitCoords.x
                && currFruitCoords.y === fruitCoords.y
        })

        this.fruitList.splice(removeIdx, 1)
    }
}