import { settings } from "../constants/settings"
import { ICoords } from "../interfaces"
import { drawBackground } from "./background"

enum Direction { Up, Down, Left, Right }

const SNAKE_SPEED = 300

export class Snake {
    context: CanvasRenderingContext2D

    private _color: string = ''

    get color(): string {
        return this._color
    }

    set color(value: string) {
        this._color = value
        this.context.fillStyle = value
    }

    private _headPosition: ICoords = { x: 0, y: 0 }

    public get headPosition(): ICoords {
        return this._headPosition;
    }

    public set headPosition(coords: ICoords) {
        this._headPosition = coords

        this._tail.forEach(this._drawCell)
        this._drawCell(coords)
    }

    private _direction: Direction | null = null

    get direction(): Direction | null {
        return this._direction
    }

    set direction(value: Direction | null) {
        if (this._direction === null && value !== null) {
            this._startCrawl();
        }
        this._direction = value
    }

    private _requestId: number | null = null

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

    constructor(context: CanvasRenderingContext2D, color: string) {
        this.context = context
        this.color = color
        this.direction = null
        this.headPosition = { 
            x: settings.CANVAS_CENTER_CELL_POSITION, 
            y: settings.CANVAS_CENTER_CELL_POSITION
        }

        // temp block; todo remove
        this.color = settings.PALETTE.secondaryColorsB[0]
        this.foodPositions.forEach(this._drawCell)
        this.color = color
        // end of temp block

        this._initEvents();
    }

    public kill = (): void => {
        cancelAnimationFrame(this._requestId as number)
    }

    private _drawCell = (coords: ICoords): void => {
        this.context.fillRect(
            coords.x + settings.GAP, 
            coords.y + settings.GAP,
            settings.RECT_CELL_SIZE,
            settings.RECT_CELL_SIZE
        )
    }

    private _updateColor = () => {
        // updating fillStyle through setter; chameleon prevention :D
        this.color = this._color
    }

    private _getNewPosition = (dir: Direction): ICoords => {
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

    private _startCrawl = (): void => {
        let start = new Date().getTime()
        
        const loop = () => {
            const delta = new Date().getTime() - start

            if (delta > SNAKE_SPEED) {
                // helper
                const hasHeadPosition = (p: ICoords) => p.x === this.headPosition.x && p.y === this.headPosition.y

                start = new Date().getTime()
                
                drawBackground(this.context)
                // temp block; todo remove
                this.color = settings.PALETTE.secondaryColorsB[0]
                this.foodPositions.forEach(coords => this.context.fillRect(
                    coords.x + settings.GAP, 
                    coords.y + settings.GAP,
                    settings.RECT_CELL_SIZE,
                    settings.RECT_CELL_SIZE
                ))
                this.color = settings.PALETTE.secondaryColor
                // end of temp block
                this._updateColor()

                let newHeadPosition: ICoords = this._getNewPosition(this.direction as Direction)

                // check if tail is food ;D
                if (this._tail.some(hasHeadPosition)) alert('oops.. you lose')

                this._tail.unshift(this.headPosition)

                // check if time for dinner
                // todo replace foodPositions with another module
                const extensionIndex = this.foodPositions.findIndex(foodCoords => 
                    this._tail.at(-1)!.x === foodCoords.x 
                    && this._tail.at(-1)!.y === foodCoords.y)

                if (extensionIndex === -1) {
                    this._tail.pop();
                } else {
                    this.foodPositions = [
                        ...this.foodPositions.slice(0, extensionIndex), 
                        ...this.foodPositions.slice(1 + extensionIndex)
                    ];
                }

                this.headPosition = newHeadPosition;
            }
            
            this._requestId = requestAnimationFrame(loop)
        }

        this._requestId = requestAnimationFrame(loop)
    }

    private _initEvents = (): void => {
        const canvas = document.getElementById('cvs') as HTMLElement

        let lastPressedKey: number | null = null;

        canvas.addEventListener('keydown', e => {
            if (lastPressedKey === e.keyCode) return
    
            lastPressedKey = e.keyCode

            switch(e.keyCode) {
                case 37: 
                    if (this.direction !== Direction.Right) this.direction = Direction.Left; 
                    break;
                case 38: 
                    if (this.direction !== Direction.Down) this.direction = Direction.Up;       
                    break;
                case 39: 
                    if (this.direction !== Direction.Left) this.direction = Direction.Right;  
                    break;
                case 40: 
                    if (this.direction !== Direction.Up) this.direction = Direction.Down;   
                    break;
            }
        })
    }
}