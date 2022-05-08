import { settings } from "../constants/settings"
import { ICoords } from "../interfaces"
import { CanvasElement } from "./canvasElement"

enum Direction { Up, Down, Left, Right }

export class Snake extends CanvasElement {
    headPosition: ICoords
    direction: Direction | null

    private _requestId: number | null = null
    private _stomach: Array<ICoords> = []
    private _tail: Array<ICoords> = []

    // todo remove
    foodPositions = [
        { x: settings.CELL_SIZE * 5, y: settings.CELL_SIZE },
        { x: settings.CELL_SIZE, y: settings.CELL_SIZE * 2 },
        { x: settings.CELL_SIZE, y: settings.CELL_SIZE },
        { x: settings.CELL_SIZE * 6, y: settings.CELL_SIZE * 7 },
        { x: settings.CELL_SIZE * 3, y: settings.CELL_SIZE * 3 },
        { x: settings.CELL_SIZE * 8, y: settings.CELL_SIZE * 2 }, 
        { x: 0, y: 0 }
    ]

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        super(canvas, context)
        super.updateFillStyle(settings.SNAKE_COLOR)

        this.headPosition = { 
            x: settings.CANVAS_CENTER_CELL_POSITION, 
            y: settings.CANVAS_CENTER_CELL_POSITION
        }
        this.drawCell(this.headPosition)

        this.direction = null

        // temp block; todo remove
        super.updateFillStyle(settings.PALETTE.secondaryColorsB[0])
        this.foodPositions.forEach(this.drawCell.bind(this))
        super.updateFillStyle(settings.SNAKE_COLOR)
        // end of temp block

        this._setEvents();
    }

    public kill(): void {
        cancelAnimationFrame(this._requestId as number)
    }

    private _getNextPosition(dir: Direction): ICoords {
        switch(dir) {
            case Direction.Up: {
                const potentialPositionY = this.headPosition.y - settings.CELL_SIZE
                return {
                    x: this.headPosition.x,
                    y: potentialPositionY < 0 
                        ? settings.CANVAS_SIZE - settings.CELL_SIZE 
                        : potentialPositionY
                }
            }
            case Direction.Down: {
                const potentialPositionY = this.headPosition.y + settings.CELL_SIZE
                return {
                    x: this.headPosition.x,
                    y: potentialPositionY + settings.CELL_SIZE > settings.CANVAS_SIZE 
                        ? 0
                        : potentialPositionY
                }
            }
            case Direction.Left: {
                const potentialPositionX = this.headPosition.x - settings.CELL_SIZE
                return {
                    x: potentialPositionX < 0
                        ? settings.CANVAS_SIZE - settings.CELL_SIZE
                        : potentialPositionX,
                    y: this.headPosition.y
                }
            }
            case Direction.Right: {
                const potentialPositionX = this.headPosition.x + settings.CELL_SIZE
                return {
                    x: potentialPositionX + settings.CELL_SIZE > settings.CANVAS_SIZE
                        ? 0
                        : potentialPositionX,
                    y: this.headPosition.y
                }
            }
        }
    }

    private _startCrawling(): void {
        let start = new Date().getTime()
        
        const loop = () => {
            const delta = new Date().getTime() - start

            if (delta > settings.SNAKE_SPEED) {
                start = new Date().getTime()
                
                // todo block opposite


                // temp block; _____________________________________________
                // todo remove
                super.updateFillStyle(settings.PALETTE.secondaryColorsB[0])
                this.foodPositions.forEach(this.drawCell.bind(this))
                super.updateFillStyle(settings.PALETTE.secondaryColor)
                // end of temp block _______________________________________




                super.updateFillStyle(settings.SNAKE_COLOR)

                let nextHeadPosition: ICoords = this._getNextPosition(this.direction as Direction)

                // check if tail is food ;D
                if (this._tail.some(p => 
                        p.x === this.headPosition.x 
                        && p.y === this.headPosition.y
                    )
                ) {
                    alert('ohhh... the snake ate itself')
                    /** 
                     * BUG with kill method
                     * doesn't work
                     */
                    this.kill()
                }

                this._tail.unshift(this.headPosition)


                // gastrointestinal tract

                if (this.foodPositions.some(p => 
                        p.x === nextHeadPosition.x
                        && p.y === nextHeadPosition.y
                    )
                ) { 
                    console.log('nyam : digestion :', nextHeadPosition)
                    this._stomach.push(nextHeadPosition)
                    console.log('stomach :', Object.assign({}, this._stomach))
                }

                let removeIdx = -1
                const digestedFoodCoords = this._stomach.find((food, idx) => {
                    const x = this._tail.length ? this._tail.at(-1)!.x : this.headPosition.x
                    const y = this._tail.length ? this._tail.at(-1)!.y : this.headPosition.y
            
                    const isDigested = food.x === x && food.y === y
                    
                    if (isDigested) removeIdx = idx
                    
                    return isDigested
                })

                if (digestedFoodCoords) {
                    console.log('digested :', digestedFoodCoords)
                    this._stomach = [
                        ...this._stomach.slice(0, removeIdx), 
                        ...this._stomach.slice(1 + removeIdx)
                    ]
                    const digestedFoodIndex = this.foodPositions.findIndex(coords => 
                        digestedFoodCoords.x === coords.x 
                        && digestedFoodCoords.y === coords.y
                    )
                    this.foodPositions = [
                        ...this.foodPositions.slice(0, digestedFoodIndex), 
                        ...this.foodPositions.slice(1 + digestedFoodIndex)
                    ]
                    console.log('the snake grew by 1')
                } else {
                    this._tail.pop();
                }
                



                this.headPosition = nextHeadPosition

                this._tail.forEach(this.drawCell.bind(this))
                this.drawCell(nextHeadPosition)
            }
            
            this._requestId = requestAnimationFrame(loop)
        }

        this._requestId = requestAnimationFrame(loop)
    }

    private _setEvents(): void {
        const allowableKeys = [37, 38, 39, 40]

        let lastPressedKey: number | null = null;

        this.canvas.addEventListener('keydown', e => {
            if (!allowableKeys.includes(e.keyCode)) return
            if (lastPressedKey === e.keyCode) return
    
            lastPressedKey = e.keyCode

            if (this.direction === null) this._startCrawling();

            switch(e.keyCode) {
                case 37: this.direction = Direction.Left;   break;
                case 38: this.direction = Direction.Up;     break;
                case 39: this.direction = Direction.Right;  break;
                case 40: this.direction = Direction.Down;   break;
            }
        })
    }
}