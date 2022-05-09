import { start } from './game/bootstrap'
import './styles/index.scss'

start()

function attachEvents(str: string): void {
    const svg = document.getElementById(`${str}-arrow-svg`)
    const reg = document.getElementById(`${str}-regular`)
    const pressed = document.getElementById(`${str}-pressed`)
    
    svg!.addEventListener('mousedown', e => {
        pressed!.style.visibility = 'visible'
        reg!.style.visibility = 'hidden'
    })
    
    svg?.addEventListener('mouseup', e => {
        pressed!.style.visibility = 'hidden'
        reg!.style.visibility = 'visible'
    })
}

['right', 'left', 'up', 'down'].forEach(arrow => attachEvents(arrow))
