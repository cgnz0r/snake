import { drawBackground } from "./background"
import { reviveSnake } from "./snake"

const cvs = <HTMLCanvasElement>document.getElementById('cvs')
const ctx = cvs.getContext('2d')

if (ctx) {
    drawBackground(ctx)
    reviveSnake(cvs, ctx)
}

const start = () => {
    console.log('starting game...')
}

export { start }