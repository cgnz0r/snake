import { settings } from "../constants/settings"
import { Direction } from "../interfaces"
import { Field } from "./canvasElements/field"
import { Snake } from "./canvasElements/snake"

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const context = canvas.getContext('2d')

if (!context) throw 'No context for canvas'

let direction: Direction = Direction.Up

const clearCanvas = () => { context.clearRect(0, 0, settings.CANVAS_SIZE, settings.CANVAS_SIZE) }

canvas.focus()

const field = new Field(context)
field.draw()

const snake = new Snake(context)
snake.draw()

const scene = () => {
    clearCanvas()

    const snakePositions = snake.getNextSnakeSlots(direction)
    const snakeHeadPosition = snakePositions[0]
    
    if (snake.checkCollision(snakeHeadPosition)) {
        alert('Oops.. You lose')
        cancelAnimationFrame(requestId)
    }

    const isFruitEaten = field.updateOccupiedSlots(snakePositions)

    field.draw()

    snake.crawl(snakeHeadPosition, isFruitEaten)
    snake.draw()
}

// loop
let startTime = new Date().getTime()
let requestId: number

const loop = () => {
    const deltaTime = new Date().getTime() - startTime

    if (deltaTime > settings.GAME_SPEED) {
        startTime = new Date().getTime()
        scene()
    }

    requestId = requestAnimationFrame(loop)
}

requestId = requestAnimationFrame(loop)

const setEvents = (): void => {
    const allowableKeys = [37, 38, 39, 40]

    let lastPressedKey: number | null = null;

    canvas.addEventListener('keydown', e => {
        if (!allowableKeys.includes(e.keyCode)) return
        if (lastPressedKey === e.keyCode) return

        lastPressedKey = e.keyCode

        // todo block opposite 

        switch(e.keyCode) {
            case 37: direction = Direction.Left;   break;
            case 38: direction = Direction.Up;     break;
            case 39: direction = Direction.Right;  break;
            case 40: direction = Direction.Down;   break;
        }
    })
}

setEvents()

export const start = () => {
    console.log('starting game...')
}