import { settings } from "../constants/settings"

// colors
const BACKGROUND_COLOR = settings.PALETTE.whiteColor
const CELL_COLOR = settings.PALETTE.experimental

const setBackgroundColor = (ctx: CanvasRenderingContext2D): void => {
    ctx.fillStyle = BACKGROUND_COLOR
    ctx.fillRect(0, 0, settings.CANVAS_SIZE, settings.CANVAS_SIZE)
}

const drawCells = (ctx: CanvasRenderingContext2D): void => {
    ctx.fillStyle = CELL_COLOR
    
    for (let i = 0; i < settings.DIMENSION; i++) {
        for (let j = 0; j < settings.DIMENSION; j++ ) {
            ctx.fillRect(
                settings.GAP + settings.CELL_SIZE * i, 
                settings.GAP + settings.CELL_SIZE * j, 
                settings.RECT_CELL_SIZE, 
                settings.RECT_CELL_SIZE
            )
        }
    }
}

export const drawBackground = (ctx: CanvasRenderingContext2D): void => {
    ctx.clearRect(0, 0, settings.CANVAS_SIZE, settings.CANVAS_SIZE)
    setBackgroundColor(ctx)
    drawCells(ctx)
}