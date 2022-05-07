import { settings } from "../constants/settings"
import { drawBackground } from "./background"

enum Direction { Up, Down, Left, Right }

interface ICoords {
    x: number,
    y: number
}

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

    private _position: ICoords = { x: 0, y: 0 }
    public get position(): ICoords {
        return this._position;
    }
    public set position(coords: ICoords) {
        this._position = coords
        this.context.fillRect(
            coords.x + settings.GAP, 
            coords.y + settings.GAP,
            settings.RECT_CELL_SIZE,
            settings.RECT_CELL_SIZE
        )
    }

    private _direction: Direction | null = null
    get direction(): Direction | null {
        return this._direction
    }
    set direction(value: Direction | null) {
        console.log('set direction', value)
        if (this._direction === null && value !== null) {
            this._startMoving();
        }
        this._direction = value
    }

    private _requestId: number | null = null

    constructor(context: CanvasRenderingContext2D, color: string) {
        this.context = context
        this.color = color
        this.direction = null
        this.position = { 
            x: settings.CANVAS_CENTER_CELL_POSITION, 
            y: settings.CANVAS_CENTER_CELL_POSITION
        }

        this._initEvents();
    }

    public stop = (): void => {
        cancelAnimationFrame(this._requestId as number)
    }

    private _moveUp = () => {
        const newPositionY = this.position.y - settings.CELL_SIZE
        
        this.position = { 
            x: this.position.x, 
            y: newPositionY < 0 
                ? settings.CANVAS_SIZE - settings.CELL_SIZE 
                : newPositionY
        }
    }

    private _moveDown = () => {
        const newPositionY = this.position.y + settings.CELL_SIZE

        this.position = { 
            x: this.position.x, 
            y: newPositionY + settings.CELL_SIZE > settings.CANVAS_SIZE 
                ? 0
                : newPositionY
        }
    }

    private _moveLeft = () => {
        const newPositionX = this.position.x - settings.CELL_SIZE
        
        this.position = { 
            x: newPositionX < 0
                ? settings.CANVAS_SIZE - settings.CELL_SIZE
                : newPositionX, 
            y: this.position.y 
        }
    }

    private _moveRight = () => {
        const newPositionX = this.position.x + settings.CELL_SIZE
        
        this.position = { 
            x: newPositionX + settings.CELL_SIZE > settings.CANVAS_SIZE
                ? 0
                : newPositionX, 
            y: this.position.y
        }
    }

    private _startMoving = () => {
        let start = new Date().getTime()
        
        const loop = () => {
            const delta = new Date().getTime() - start

            if (delta > SNAKE_SPEED) {
                start = new Date().getTime()
                
                // kostyl; debuggin...
                drawBackground(this.context)
                this.color = settings.PALETTE.secondaryColorsA[2]

                switch(this.direction) {
                    case Direction.Up: this._moveUp(); break;
                    case Direction.Down: this._moveDown(); break;
                    case Direction.Left: this._moveLeft(); break;
                    case Direction.Right: this._moveRight(); break;
                }
            }
            
            this._requestId = requestAnimationFrame(loop)
        }

        this._requestId = requestAnimationFrame(loop)
    }

    private _initEvents = (): void => {
        const canvas = document.getElementById('cvs') as HTMLElement
        // let lastPressedKey: number | null = null;

        canvas.addEventListener('keydown', e => {
            // if (lastPressedKey === e.keyCode) return
    
            // lastPressedKey = e.keyCode
    
            switch(e.keyCode) {
                case 37: this.direction = Direction.Left;   break;
                case 38: this.direction = Direction.Up;     break;
                case 39: this.direction = Direction.Right;  break;
                case 40: this.direction = Direction.Down;   break;
            }
        })
    }
}