const CANVAS_SIZE                   = 640
const DIMENSION                     = 16 // 25bug
const GAP                           = 1  // 0.5bug
const GAME_SPEED                    = 200
const FRUITS_QTY_AT_MOMENT          = 2
const CELL_SIZE                     = CANVAS_SIZE / DIMENSION
const CANVAS_RECT                   = [0, 0, CANVAS_SIZE, CANVAS_SIZE] as const

const INITIAL_SNAKE_POSITION = { 
    x: Math.ceil(DIMENSION / 2.0),
    y: Math.ceil(DIMENSION / 2.0)
}

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
    CANVAS_RECT,

    // cell size & position
    CELL_SIZE,
    INITIAL_SNAKE_POSITION,
    
    // colors
    PALETTE,
    BACKGROUND_CELL_COLOR,
    BACKGROUND_COLOR,
    SNAKE_COLOR,
    FRUIT_COLOR
}