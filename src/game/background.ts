import { settings } from "../constants/settings"
import { CanvasElement } from "./canvasElement"

export class Background extends CanvasElement {
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        super(canvas, context)
    }

    public draw(): void {
        this._drawBackPart()
        this._drawFrontPart()
    }

    public clear(): void {
        this.context.clearRect(0, 0, settings.CANVAS_SIZE, settings.CANVAS_SIZE)
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
}