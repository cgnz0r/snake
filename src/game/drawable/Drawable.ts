import { settings } from "../../constants/settings"

export abstract class Drawable {
    protected _context: CanvasRenderingContext2D

    constructor(context: CanvasRenderingContext2D) {
        this._context = context
    }

    protected _updateFillStyle(color: string): void {
        this._context.fillStyle = color
    }

    /**
     * Draws cell by x y abs position
     * @param x abs position X: 0..DIMENSION
     * @param y abs position Y: 0..DIMENSION
     */
    protected _drawCell(x: number, y: number): void {
        this._context.fillRect(
            settings.GAP + settings.CELL_SIZE * x,
            settings.GAP + settings.CELL_SIZE * y,
            settings.CELL_SIZE - settings.GAP * 2,
            settings.CELL_SIZE - settings.GAP * 2
        )
    }

    abstract draw(): void
}