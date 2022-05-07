import { drawBackground } from "./background"
import { Snake } from "./snake"
import { settings } from "../constants/settings"

const cvs = <HTMLCanvasElement>document.getElementById('cvs')
const ctx = cvs.getContext('2d')

const SNAKE_COLOR = settings.PALETTE.secondaryColorsA[2]

const stopGameButton = document.getElementById('stopGame')

if (ctx && stopGameButton) {
    cvs.focus()
    drawBackground(ctx)
    const snake = new Snake(ctx, SNAKE_COLOR)

    // for debugging
    stopGameButton.addEventListener('click', () => {
        snake.stop()
    })
}

const start = () => {
    console.log('starting game...')
}

export { start }