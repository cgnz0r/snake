import { settings } from "../constants/settings"
import { Direction, ICoords } from "../interfaces"
import { CanvasElement } from "./canvasElement"

const CANVAS_CENTER = { 
    x: settings.CANVAS_CENTER_CELL_POSITION, 
    y: settings.CANVAS_CENTER_CELL_POSITION
}

export class Snake extends CanvasElement {
    headPosition: ICoords

    private _stomach: Array<ICoords> = []
    private _tail: Array<ICoords> = []

    constructor(context: CanvasRenderingContext2D) {
        super(context)
        super.updateFillStyle(settings.SNAKE_COLOR)

        this.headPosition = CANVAS_CENTER
    }

    public draw(): void {
        super.updateFillStyle(settings.SNAKE_COLOR)
        this.drawCell(this.headPosition)
        this._tail.forEach(this.drawCell.bind(this))
    }

    public crawl(position: ICoords, hasFruit: boolean): void {
        this._tail.unshift(this.headPosition)
        
        let removeIdx = -1
        const digestedFruitCoords = this._stomach.find((fruitPosition, idx) => {
            const x = this._tail.length ? this._tail.at(-1)!.x : this.headPosition.x
            const y = this._tail.length ? this._tail.at(-1)!.y : this.headPosition.y
    
            const isDigested = fruitPosition.x === x && fruitPosition.y === y
            
            if (isDigested) removeIdx = idx
            
            return isDigested
        })

        if (digestedFruitCoords) {
            console.log('snake :: digested fruit :', digestedFruitCoords)
            this._stomach = [
                ...this._stomach.slice(0, removeIdx), 
                ...this._stomach.slice(1 + removeIdx)
            ]
            console.log('snake :: grew by 1!')
        } else {
            this._tail.pop();
        }

        this.headPosition = position

        if (hasFruit) {
            console.log('snake :: eating fruit :', position)
            this._stomach.push(position)
            console.log('snake :: stomach :', Object.assign({}, this._stomach))
        }
    }

    public getNextHeadPosition(direction: Direction): ICoords {
        switch(direction) {
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

    public checkCollision(nextHeadPosition: ICoords): boolean {
        return this._tail.some(p => 
            p.x === nextHeadPosition.x 
            && p.y === nextHeadPosition.y
        )
    }
}