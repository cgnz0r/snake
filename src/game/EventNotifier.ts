import { IControls, Key } from "../interfaces";

export class EventNotifier {
    private _controls: IControls
    private _subscribers: Array<{
        callback: (key: Key) => void,
        keys: Array<Key>
    }>

    constructor(controls: IControls) {
        this._controls = controls
        this._subscribers = []

        this._initNotifier()
    }

    private _initNotifier(): void {
        document.addEventListener('keydown', e => {
            const key = this._controls.getKey(e.keyCode)

            if (typeof key === 'undefined') return
            
            this._subscribers.forEach(sub => {
                if (sub.keys.includes(key)) sub.callback(key)
            })
        })
    }

    public subscribe(callback: (key: Key) => void, keys: Array<Key>): void {
        this._subscribers.push({ callback,  keys })
    }
}