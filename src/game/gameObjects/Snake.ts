
import { settings } from "../../constants/settings"
import { ICoords, Direction } from "../../interfaces"
import { ISnake } from "../../interfaces"

export class Snake implements ISnake {
    private _head: ICoords
    private _stomach: Array<ICoords> = []
    private _tail: Array<ICoords> = []

    constructor() {
        this._head = settings.INITIAL_SNAKE_POSITION
    }

    public getHeadPosition(): ICoords {
        return this._head
    }

    public getTailPositions(): Array<ICoords> {
        return this._tail;
    }

    public reset(): void {
        this._head = settings.INITIAL_SNAKE_POSITION
        this._tail.splice(0, this._tail.length)
    }

    /**
     * Sets next head coords and feeds the snake (or not :D)
     * @param head head coords
     * @param hasFruit true if you want to feed the snake ;p
     */
    public setNextCoords(head: ICoords, hasFruit: boolean): void {
        this._tail.unshift(this._head)
        
        let removeIdx = -1
        const digestedFruitCoords = this._stomach.find((fruitPosition, idx) => {
            const x = this._tail.length ? this._tail.at(-1)!.x : this._head.x
            const y = this._tail.length ? this._tail.at(-1)!.y : this._head.y
    
            const isDigested = fruitPosition.x === x && fruitPosition.y === y
            
            if (isDigested) removeIdx = idx
            
            return isDigested
        })

        if (digestedFruitCoords) this._stomach.splice(removeIdx, 1)
        else this._tail.pop()

        this._head = head

        if (hasFruit) this._stomach.push(head)
    }

    /**
     * Calculates next snake coords or notifies about crash [false]
     * @returns False - ate itself; otherwise next snake coords
     */
    public getNextCoords(direction: Direction): Array<ICoords> | boolean {
        const head = this._getNextHead(direction);
        
        // ate itself
        if (this._tail.some(p => p.x === head.x && p.y === head.y)) return false

        // next snake coords
        return [ head, this._head, ...this._tail.slice(0, -1) ]
    }

    private _getNextHead(direction: Direction): ICoords {
        switch(direction) {
            case Direction.Up: {
                const posY = this._head.y - 1
                return {
                    x: this._head.x,
                    y: posY < 0 ? settings.DIMENSION - 1 : posY
                }
            }
            case Direction.Down: {
                const posY = this._head.y + 1
                return {
                    x: this._head.x,
                    y: posY === settings.DIMENSION ? 0 : posY
                }
            }
            case Direction.Left: {
                const posX = this._head.x - 1
                return {
                    x: posX < 0 ? settings.DIMENSION - 1 : posX,
                    y: this._head.y
                }
            }
            case Direction.Right: {
                const posX = this._head.x + 1
                return {
                    x: posX === settings.DIMENSION ? 0 : posX,
                    y: this._head.y
                }
            }
        }
    }
}