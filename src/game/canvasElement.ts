import { settings } from "../constants/settings"
import { ICoords } from "../interfaces"

export class CanvasElement {
    protected canvas:   HTMLCanvasElement
    protected context:  CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvas
        this.context = context
    }

    protected updateFillStyle(color: string): void {
        this.context.fillStyle = color
    }

    protected drawCell(coords: ICoords): void {
        this.context.fillRect(
            settings.GAP + coords.x, 
            settings.GAP + coords.y,
            settings.RECT_CELL_SIZE,
            settings.RECT_CELL_SIZE
        )
    }
}