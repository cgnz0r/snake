import { settings } from "../../constants/settings";
import { ISnake, IDrawable } from "../../interfaces";
import { Drawable } from "./Drawable";

export class SnakeView extends Drawable implements IDrawable {
    private _snake: ISnake

    constructor(context: CanvasRenderingContext2D, snake: ISnake) {
        super(context)
        this._snake = snake
    }

    public draw(): void {
        super._updateFillStyle(settings.SNAKE_COLOR)
        const head = this._snake.getHead()
        const tail = this._snake.getTail()

        this._drawCell(head.x, head.y)
        tail.forEach(pos => this._drawCell.call(this, pos.x, pos.y))
    }
}