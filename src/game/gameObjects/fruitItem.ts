import { ICoords } from "../../interfaces";

export class FruitItem {
    private _position: ICoords

    constructor(position: ICoords) {
        this._position = position
    }

    /**
     * Draws fruit
     */
    // public draw(): void {
    //     super.updateFillStyle(settings.FRUIT_COLOR)
    //     this.drawCell(this._position)
    // }

    /**
     * Returns fruit coords
     * @returns 
     */
    public getCoords(): ICoords {
        return this._position
    }
}