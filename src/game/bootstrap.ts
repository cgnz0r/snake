import { settings } from "../constants/settings"
import { Direction } from "../interfaces"
import { Field } from "./canvasElements/field"
import { Snake } from "./canvasElements/snake"
import { frame } from "./frame"

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const context = canvas.getContext('2d')

if (!context) throw 'No context for canvas'

console.log('loading game...')

let direction: Direction

canvas.focus()

const field = new Field(context)
field.draw()

const snake = new Snake(context)
snake.draw()

let requestId: number
let startTime = new Date().getTime()
let lastAplliedDirection: Direction | null = null

function loop(): void {
    const deltaTime = new Date().getTime() - startTime

    if (deltaTime > settings.GAME_SPEED) {
        startTime = new Date().getTime()
        
        const result = frame(context!, snake, field, direction)
        
        lastAplliedDirection = direction
        
        if (!result) {
            alert('you lose')
            cancelAnimationFrame(requestId)
            return
        }
    }

    requestId = requestAnimationFrame(loop)
}

const setEvents = (): void => {
    const allowableKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

    let lastPressedKey: string | null = null;
    let isGameStarted = false

    document.addEventListener('keydown', e => {
        if (!allowableKeys.includes(e.key)) return
        if (lastPressedKey === e.key) return

        lastPressedKey = e.key

        switch(e.key) {
            case 'ArrowLeft': {
                direction = lastAplliedDirection !== null
                    && lastAplliedDirection === Direction.Right
                    ? Direction.Right
                    : Direction.Left
                break
            }
            case 'ArrowUp': {
                direction = lastAplliedDirection !== null
                    && lastAplliedDirection === Direction.Down
                    ? Direction.Down
                    : Direction.Up
                break
            }
            case 'ArrowRight': {
                direction = lastAplliedDirection !== null
                    && lastAplliedDirection === Direction.Left
                    ? Direction.Left
                    : Direction.Right
                break
            }
            case 'ArrowDown': {
                direction = lastAplliedDirection !== null
                    && lastAplliedDirection === Direction.Up
                    ? Direction.Up
                    : Direction.Down
                break
            }
        }

        if (!isGameStarted) {
            console.log('starting game...')
            loop()
            isGameStarted = true
        }
    })
}

export const start = () => {
    setEvents()
}