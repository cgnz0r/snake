// import { settings } from "../constants/settings"
// import { Direction } from "../interfaces"
// import { Field } from "./canvasElements/field"
import { Snake } from "./gameObjects/Snake"
import { BackgroundView } from "./drawable/BackgroundView"
import { SnakeView } from "./drawable/SnakeView"
import { Game } from "./Game"
import { Scene } from "./drawable/Scene"
import { IGame, Key } from "../interfaces"
import { Controls } from "./Controls"
import { EventNotifier } from "./EventNotifier"
import { settings } from "../constants/settings"

/*
let direction: Direction

let requestId: number
let lastAplliedDirection: Direction | null = null

const setEvents = (): void => {
    const allowableKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

    let lastPressedKey: string | null = null;
    let isGameStarted = false

    document.addEventListener('keydown', e => {
        if (!allowableKeys.includes(e.key)) return
        if (lastPressedKey === e.key) return

        lastPressedKey = e.key

        switch(e.key) {
            case 'ArrowLeft': {
                direction = lastAplliedDirection !== null
                    && lastAplliedDirection === Direction.Right
                    ? Direction.Right
                    : Direction.Left
                break
            }
            case 'ArrowUp': {
                direction = lastAplliedDirection !== null
                    && lastAplliedDirection === Direction.Down
                    ? Direction.Down
                    : Direction.Up
                break
            }
            case 'ArrowRight': {
                direction = lastAplliedDirection !== null
                    && lastAplliedDirection === Direction.Left
                    ? Direction.Left
                    : Direction.Right
                break
            }
            case 'ArrowDown': {
                direction = lastAplliedDirection !== null
                    && lastAplliedDirection === Direction.Up
                    ? Direction.Up
                    : Direction.Down
                break
            }
        }

        if (!isGameStarted) {
            console.log('starting game...')
            loop()
            isGameStarted = true
        }
    })
}
*/
export const initGame = (): IGame => {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas')
    const context = canvas.getContext('2d')

    if (!context) throw 'No context for canvas'

    canvas.focus()

    const controls = new Controls(settings.DEFAULT_KEYS)
    const notifier = new EventNotifier(controls)

    // todo: fruits
    const snake = new Snake()
    notifier.subscribe(snake.setControls, [Key.UpKey, Key.DownKey, Key.LeftKey, Key.RightKey])

    const backgroundView = new BackgroundView(context)
    const snakeView = new SnakeView(context, snake)
    const scene = new Scene(context, backgroundView, snakeView)

    const game = new Game(scene, snake)
    notifier.subscribe(game.setControls, [Key.ContinueKey, Key.PauseKey, Key.StopKey])
    
    return game
}