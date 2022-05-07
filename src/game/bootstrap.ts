import { drawBg } from "./background"

const cvs = <HTMLCanvasElement>document.getElementById('cvs')
const ctx = cvs.getContext('2d')

if (ctx) {
    drawBg(ctx)
}

const start = () => {
    console.log('starting game...')
}

export { start }