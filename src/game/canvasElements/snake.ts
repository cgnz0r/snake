
import { settings } from "../../constants/settings"
import { ICoords, Direction } from "../../interfaces"
import { CanvasElement } from "./canvasElement"

export class Snake extends CanvasElement {
    headPosition: ICoords

    private _stomach: Array<ICoords> = []
    private _tail: Array<ICoords> = []

    constructor(context: CanvasRenderingContext2D) {
        super(context)
        super.updateFillStyle(settings.SNAKE_COLOR)

        this.headPosition = settings.INITIAL_SNAKE_POSITION
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

        if (digestedFruitCoords) this._stomach.splice(removeIdx, 1)
        else this._tail.pop()

        this.headPosition = position

        if (hasFruit) this._stomach.push(position)
    }

    /**
     * Calculates next snake slots or notifies about crash
     * @param direction snake's direction :: up, down, left, right
     * @returns false if snake ate itself; otherwise next snake slots
     */
    public getNextSnakeSlots(direction: Direction): Array<ICoords> | boolean {
        let headPosition: ICoords;
        switch(direction) {
            case Direction.Up: {
                const potentialPositionY = this.headPosition.y - settings.CELL_SIZE
                headPosition = {
                    x: this.headPosition.x,
                    y: potentialPositionY < 0 
                        ? settings.CANVAS_SIZE - settings.CELL_SIZE 
                        : potentialPositionY
                }
                break
            }
            case Direction.Down: {
                const potentialPositionY = this.headPosition.y + settings.CELL_SIZE
                headPosition = {
                    x: this.headPosition.x,
                    y: potentialPositionY + settings.CELL_SIZE > settings.CANVAS_SIZE 
                        ? 0
                        : potentialPositionY
                }
                break
            }
            case Direction.Left: {
                const potentialPositionX = this.headPosition.x - settings.CELL_SIZE
                headPosition = {
                    x: potentialPositionX < 0
                        ? settings.CANVAS_SIZE - settings.CELL_SIZE
                        : potentialPositionX,
                    y: this.headPosition.y
                }
                break
            }
            case Direction.Right: {
                const potentialPositionX = this.headPosition.x + settings.CELL_SIZE
                headPosition = {
                    x: potentialPositionX + settings.CELL_SIZE > settings.CANVAS_SIZE
                        ? 0
                        : potentialPositionX,
                    y: this.headPosition.y
                }
                break
            }
        }

        // ate itself
        if (this._tail.some(p => 
            p.x === headPosition.x 
            && p.y === headPosition.y
        )) return false

        // next snake slots
        return [ headPosition, this.headPosition, ...this._tail.slice(0,-1) ]
    }
}