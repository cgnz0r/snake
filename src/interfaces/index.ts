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
    [Key.RightKey]      : number,
    [Key.LeftKey]       : number,
    [Key.UpKey]         : number,
    [Key.DownKey]       : number,
    [Key.PauseKey]      : number,
    [Key.ContinueKey]   : number,
    [Key.StopKey]       : number
}

export interface ICoords {
    x: number,
    y: number
}

export interface IControllable {
    setControls(key: Key): void
}

export interface IDrawable {
    draw(): void
}

export interface IScene extends IDrawable {
    clear(): void
}

export interface ISnake extends IControllable {
    getHead(): ICoords
    getTail(): Array<ICoords>
    setNextCoords(head: ICoords, hasFruit: boolean): void
    getNextCoords(direction: Direction): Array<ICoords> | boolean
    reset(): void
}

export interface IGame extends IControllable {
    start(): void
    pause(): void
    stop(): void
    setMode(mode: Mode): void
}

export interface IControls {
    assignKey(key: Key, keyCode: number): void
    getKey(keyCode: number): Key | undefined
}