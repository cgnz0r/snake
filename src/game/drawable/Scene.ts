import { settings } from "../../constants/settings"
import { IDrawable, IScene } from "../../interfaces"
import { Drawable } from "./Drawable"

export class Scene extends Drawable implements IScene {
    private _background: IDrawable
    private _snake: IDrawable

    constructor(context: CanvasRenderingContext2D, background: IDrawable, snake: IDrawable) {
        super(context)
        
        this._background = background
        this._snake = snake
    }

    public draw(): void {
        this._background.draw()
        this._snake.draw()
    }

    public clear(): void {
        this._context.clearRect(...settings.CANVAS_RECT)
    }
}