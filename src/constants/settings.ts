const CANVAS_SIZE                   = 640
const DIMENSION                     = 16 // 25bug
const GAP                           = 1  // 0.5bug
const CELL_SIZE                     = CANVAS_SIZE / DIMENSION
const RECT_CELL_SIZE                = CELL_SIZE - GAP * 2
const CANVAS_CENTER_CELL_POSITION   = GAP * Math.ceil(CANVAS_SIZE / 2 / GAP)

const PALETTE = {
    secondaryColor  : 'rgb(130, 178, 44)', // green
    secondaryColorsB: [ '#6C0AAB', '#5D2680', '#45036F', '#9A3FD5', '#AA67D5' ], // purple
    primaryColors   : [ '#FF9200', '#BF8230', '#A65F00', '#FFAD40', '#FFC373' ], // orange
    whiteColor      : 'rgb(250, 250, 250)',
    experimental    : 'rgba(206, 206, 206, 0.4)'
}

export const settings = {
    CANVAS_SIZE,
    DIMENSION,
    CELL_SIZE,
    RECT_CELL_SIZE,
    CANVAS_CENTER_CELL_POSITION,
    GAP,
    PALETTE
}