import { settings } from "../../constants/settings"
import { IDrawable } from "../../interfaces"
import { Drawable } from "./Drawable"

export class BackgroundView extends Drawable implements IDrawable {
    constructor(context: CanvasRenderingContext2D) {
        super(context)
    }

    public draw() {
        this._drawBackground()
        this._drawCells()
    }
 
    private _drawBackground(): void {
        super._updateFillStyle(settings.BACKGROUND_COLOR)
        this._context.fillRect(...settings.CANVAS_RECT)
    }

    private _drawCells(): void {
        super._updateFillStyle(settings.BACKGROUND_CELL_COLOR)
    
        for (let x = 0; x < settings.DIMENSION; x++) {
            for (let y = 0; y < settings.DIMENSION; y++) {
                super._drawCell(x, y)
            }
        }
    }
}