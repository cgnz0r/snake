import { settings } from "../constants/settings";
import { Direction, ICoords, IScene, ISnake, Mode, IGame } from "../interfaces";

export class Game implements IGame {
    private _scene: IScene
    private _snake: ISnake
    private _mode: Mode
    private _isGameStarted: boolean

    private _startTime: number = 0
    private _requestId: number = 0

    constructor(scene: IScene, snake: ISnake) {
        this._scene = scene
        this._snake = snake
        this._mode = Mode.Classic
        this._isGameStarted = false

        this._scene.draw()
    }

    public start(): void {
        if (this._isGameStarted) return

        this._startTime = new Date().getTime()

        const loop = () => {
            const deltaTime = new Date().getTime() - this._startTime

            if (deltaTime > settings.GAME_SPEED) {
                this._startTime = new Date().getTime()
                
                const isFrameSucceed = this._proceedFrame()
                
                if (!isFrameSucceed) {
                    alert('you lose')
                    this.pause()
                    return
                }
            }

            this._requestId = requestAnimationFrame(loop)
        }

        loop()

        this._isGameStarted = true
    }

    public pause(): void {
        cancelAnimationFrame(this._requestId)
        this._isGameStarted = false
    }

    public stop(): void {
        cancelAnimationFrame(this._requestId)
        this._snake.reset()
        this._scene.draw()
        this._isGameStarted = false
    }

    public setMode(mode: Mode): void {
        this._mode = mode
    }

    /**
     * 
     * @returns false if gameover; true - frame is succeed 
     */
    private _proceedFrame(): boolean {
        const mockDirection = Direction.Up
        const mockIsFruitEaten = false

        const snakeCoords = this._snake.getNextCoords(mockDirection)

        if (!snakeCoords) return false

        this._scene.clear()

        this._snake.setNextCoords((snakeCoords as Array<ICoords>)[0], mockIsFruitEaten)

        // const isFruitEaten = field.updateOccupiedSlots((snakeSlots as Array<ICoords>))

        // snake.crawl((snakeSlots as Array<ICoords>)[0], isFruitEaten)

        this._scene.draw()

        return true
    }
}