const CANVAS_SIZE       = 640
const DIMENSION         = 16
const GAP               = 1
const CELL_SIZE         = CANVAS_SIZE / DIMENSION
const RECT_CELL_SIZE    = CELL_SIZE - GAP * 2

const PALETTE = {
    secondaryColorsA: [ '#98ED00', '#82B22C', '#639A00', '#B4F63D', '#C6F66F' ],
    secondaryColorsB: [ '#6C0AAB', '#5D2680', '#45036F', '#9A3FD5', '#AA67D5' ],
    primaryColors   : [ '#FF9200', '#BF8230', '#A65F00', '#FFAD40', '#FFC373' ],
    whiteColors     : [ '#FAFAFA' ]
}

export const settings = {
    CANVAS_SIZE,
    DIMENSION,
    CELL_SIZE,
    RECT_CELL_SIZE,
    GAP,
    PALETTE
}