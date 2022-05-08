import { drawBackground } from "./background"
import { Snake } from "./snake"
import { settings } from "../constants/settings"

const cvs = <HTMLCanvasElement>document.getElementById('cvs')
const ctx = cvs.getContext('2d')

const SNAKE_COLOR = settings.PALETTE.secondaryColor

if (ctx) {
    cvs.focus()
    drawBackground(ctx)
    const snake = new Snake(ctx, SNAKE_COLOR)

    const field = []

    // snake.watchField(foodField)

    // field.generate

    // for debugging
    document.getElementById('stopGame')!.addEventListener('click', () => {
        snake.kill()
    })
}

const start = () => {
    console.log('starting game...')
}

export { start }