import { settings } from "../constants/settings"

enum Direction { Up, Down, Left, Right }

const SNAKE_COLOR = settings.PALETTE.secondaryColorsA[2]

const getInitialPosition = (): number => {
    const center = settings.CANVAS_SIZE / 2
    return settings.GAP * Math.ceil(center / settings.GAP)
}

const drawCell = (ctx: CanvasRenderingContext2D, position: number): void => {
    ctx.fillRect(
        position + settings.GAP, 
        position + settings.GAP,
        settings.RECT_CELL_SIZE,
        settings.RECT_CELL_SIZE
    )
}

const initEvents = (cvs: HTMLCanvasElement): void => {
    let lastPressedKey: number | null = null;
    cvs.addEventListener('keydown', e => {
        if (lastPressedKey === e.keyCode) return

        lastPressedKey = e.keyCode
        console.log(e.keyCode)
    })
}

const moveSnake = (ctx: CanvasRenderingContext2D, direction: Direction): void => {

}

export const reviveSnake = (cvs: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void => {
    ctx.fillStyle = SNAKE_COLOR

    initEvents(cvs)

    const initialPosition = getInitialPosition()
    drawCell(ctx, initialPosition)
}