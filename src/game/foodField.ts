import { ICoords } from "../interfaces"

export class Field {
    qty: number

    foodField: Array<ICoords> = []

    constructor(initialQty: number) {
        this.qty = initialQty


    }

    private _spawnFood = () => {
        
    }
}