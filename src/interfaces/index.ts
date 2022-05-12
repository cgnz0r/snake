export enum Direction { 
    Up, 
    Down, 
    Left, 
    Right 
}

export enum Mode { 
    Classic 
}

export enum Key {
    RightKey,
    LeftKey,
    UpKey,
    DownKey,
    PauseKey,
    ContinueKey,
    StopKey,
}

export interface IKeys {
    [Key.RightKey]: number,
    [Key.LeftKey]: number,
    [Key.UpKey]: number,
    [Key.DownKey]: number,
    [Key.PauseKey]: number,
    [Key.ContinueKey]: number,
    [Key.StopKey]: number
}

export interface IKeyCallbacks {
    [Key.RightKey]: () => void,
    [Key.LeftKey]: () => void,
    [Key.UpKey]: () => void,
    [Key.DownKey]: () => void,
    [Key.PauseKey]: () => void,
    [Key.ContinueKey]: () => void,
    [Key.StopKey]: () => void
}

export interface ICoords {
    x: number,
    y: number
}

export interface IDrawable {
    draw(): void
}

export interface IScene extends IDrawable {
    clear(): void
}

export interface ISnake {
    getHeadPosition(): ICoords
    getTailPositions(): Array<ICoords>
    setNextCoords(head: ICoords, hasFruit: boolean): void
    getNextCoords(direction: Direction): Array<ICoords> | boolean
    reset(): void
}

export interface IGame {
    start(): void
    pause(): void
    stop(): void
    setMode(mode: Mode): void
}

export interface IControls {
    assignKey(key: Key, keyCode: number, keyCallback: () => void): void
    getKeyCode(key: Key): number
}