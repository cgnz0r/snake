import { Background } from "./background"
import { Snake } from "./snake"

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const context = canvas.getContext('2d')

if (context) {
    canvas.focus()
    
    const background = new Background(canvas, context)
    background.draw()

    const snake = new Snake(canvas, context)

    

    // loop



    // for debugging
    document.getElementById('stopGame')!.addEventListener('click', () => {
        snake.kill()
    })
}

const start = () => {
    console.log('starting game...')
}

export { start }