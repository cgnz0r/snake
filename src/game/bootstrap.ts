const cvs = <HTMLCanvasElement>document.getElementById('cvs')
const ctx = cvs.getContext('2d')

if (ctx) {
    ctx.font = '24px serif'
    ctx.fillText('Viva la canvas!', 50, 50)
}

const start = () => {
    console.log('starting game...')
}

export { start }