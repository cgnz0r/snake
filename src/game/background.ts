import { settings } from "../constants/settings";

// colors
const backgroundColor = settings.palette.whiteColors[0]
const cellColor = settings.palette.primaryColors[1]

export const drawBg = (ctx: CanvasRenderingContext2D): void => {
    // background coloring
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, settings.canvasWidth, settings.canvasWidth);

    // cells coloring
    ctx.fillStyle = cellColor
    const cellQtyPerLine = settings.canvasWidth / settings.cell.width;

    for (let i = 0; i < cellQtyPerLine; i++) {
        for (let j = 0; j < cellQtyPerLine; j++ ) {
            ctx.fillRect(
                settings.cell.borderWidth + settings.cell.width * i, 
                settings.cell.borderWidth + settings.cell.width * j, 
                settings.cell.width - settings.cell.borderWidth * 2, 
                settings.cell.width - settings.cell.borderWidth * 2
            )
        }
    }
}