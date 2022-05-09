import { settings } from "../../constants/settings";
import { ICoords } from "../../interfaces";
import { CanvasElement } from "./canvasElement";

export class Fruit extends CanvasElement {
    private _position: ICoords

    constructor(context: CanvasRenderingContext2D, position: ICoords) {
        super(context)

        this._position = position
    }

    public draw(): void {
        super.updateFillStyle(settings.FRUIT_COLOR)
        this.drawCell(this._position)
    }

    public getPosition(): ICoords {
        return this._position
    }
}