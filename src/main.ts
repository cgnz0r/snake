import { initGame } from './game/initialize'
import './styles/index.scss'

const game = initGame()

// todo: disable state for buttons
document.getElementById('pause')?.addEventListener('click', e =>  {
    game.pause()
})
document.getElementById('start')?.addEventListener('click', e =>  {
    game.start()
})
document.getElementById('stop')?.addEventListener('click', e =>  {
    game.stop()
})