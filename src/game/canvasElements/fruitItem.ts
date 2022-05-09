import { settings } from "../../constants/settings";
import { ICoords } from "../../interfaces";
import { CanvasElement } from "./canvasElement";

export class FruitItem extends CanvasElement {
    private _position: ICoords

    constructor(context: CanvasRenderingContext2D, position: ICoords) {
        super(context)

        this._position = position
    }

    /**
     * Draws fruit
     */
    public draw(): void {
        super.updateFillStyle(settings.FRUIT_COLOR)
        this.drawCell(this._position)
    }

    /**
     * Returns fruit coords
     * @returns 
     */
    public getCoords(): ICoords {
        return this._position
    }
}