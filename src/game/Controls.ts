import { IControls, IKeyCallbacks, IKeys, Key } from "../interfaces"

export class Controls implements IControls {
    private _keys: IKeys
    private _keyCallbacks: IKeyCallbacks

    private _mainCallback?: (e: KeyboardEvent) => void
    get mainCallback(): (e: KeyboardEvent) => void {
        const plug = () => null
        return this._mainCallback || plug
    }
    set mainCallback(callback) {
        this._mainCallback = callback
    }

    constructor(keys: IKeys, keyCallbacks: IKeyCallbacks) {
        this._keys = keys
        this._keyCallbacks = keyCallbacks

        this._attachEventListener(this._keys, this._keyCallbacks)
    }

    public assignKey(key: Key, keyCode: number, keyCallback: () => void): void {
        // todo
        this._keys[key] = keyCode
    }

    public getKeyCode(key: Key): number {
        return this._keys[key]
    }

    private _attachEventListener(keys: IKeys, callbacks: IKeyCallbacks): void {
        // todo
        this.mainCallback = (e: KeyboardEvent) => {
            switch (e.keyCode)  {
                case Key.ContinueKey: {

                    break;
                }
                case Key.DownKey: {

                    break;
                }
                case Key.LeftKey: {

                    break;
                }
                case Key.PauseKey: {

                    break;
                }
                case Key.RightKey: {

                    break;
                }
                case Key.StopKey: {

                    break;
                }
                case Key.UpKey: {

                    break;
                }

            }
        }
    }

    private _removeEventListener(): void {
        document.removeEventListener('keydown', this.mainCallback)
    }
}