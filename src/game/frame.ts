import { settings } from "../constants/settings"
import { Direction, ICoords } from "../interfaces"
import { Field } from "./canvasElements/field"
import { Snake } from "./canvasElements/snake"

export function frame(
    context: CanvasRenderingContext2D, 
    snake: Snake, 
    field: Field, 
    direction: Direction
): boolean {
    const snakeSlots = snake.getNextSnakeSlots(direction)

    if (!snakeSlots) return false

    context.clearRect(0, 0, settings.CANVAS_SIZE, settings.CANVAS_SIZE)

    const isFruitEaten = field.updateOccupiedSlots((snakeSlots as Array<ICoords>))

    field.draw()

    snake.crawl((snakeSlots as Array<ICoords>)[0], isFruitEaten)
    snake.draw()

    return true
}