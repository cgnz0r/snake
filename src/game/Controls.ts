import { IControls, IKeys, Key } from "../interfaces"

export class Controls implements IControls {
    private _keys: IKeys

    constructor(keys: IKeys) {
        this._keys = keys

        console.log(this._keys)
    }

    public assignKey(key: Key, keyCode: number): void {
        this._keys[key] = keyCode
    }

    public getKey(keyCode: number): Key | undefined {
        const keyPairs  = Object.entries(this._keys)
        const keyPair   = keyPairs.find(pair => keyCode === pair[1])

        return keyPair && Number(keyPair[0])
    }
}