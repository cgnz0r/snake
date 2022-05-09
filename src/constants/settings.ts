const CANVAS_SIZE                   = 640
const DIMENSION                     = 16 // 25bug
const GAP                           = 1  // 0.5bug
const GAME_SPEED                    = 200
const FRUITS_QTY_AT_MOMENT          = 2
const CELL_SIZE                     = CANVAS_SIZE / DIMENSION
const RECT_CELL_SIZE                = CELL_SIZE - GAP * 2
const CANVAS_CENTER_CELL_POSITION   = GAP * Math.ceil(CANVAS_SIZE / 2 / GAP)
const INITIAL_SNAKE_POSITION        = { x: CANVAS_CENTER_CELL_POSITION, y: CANVAS_CENTER_CELL_POSITION }

const PALETTE = {
    secondaryColor  : 'rgb(130, 178, 44)', // green
    secondaryColorsB: [ '#6C0AAB', '#5D2680', '#45036F', '#9A3FD5', '#AA67D5' ], // purple
    primaryColors   : [ '#FF9200', '#BF8230', '#A65F00', '#FFAD40', '#FFC373' ], // orange
    whiteColor      : 'rgb(250, 250, 250)',
    experimental    : 'rgba(206, 206, 206, 0.4)'
}

const BACKGROUND_CELL_COLOR = PALETTE.experimental
const BACKGROUND_COLOR      = PALETTE.whiteColor
const SNAKE_COLOR           = PALETTE.secondaryColor
const FRUIT_COLOR           = PALETTE.secondaryColorsB[2]

export const settings = {
    // game
    CANVAS_SIZE,
    DIMENSION,
    GAP,
    GAME_SPEED,
    FRUITS_QTY_AT_MOMENT,

    // cell size & position
    CELL_SIZE,
    RECT_CELL_SIZE,
    INITIAL_SNAKE_POSITION,
    
    // colors
    PALETTE,
    BACKGROUND_CELL_COLOR,
    BACKGROUND_COLOR,
    SNAKE_COLOR,
    FRUIT_COLOR
}