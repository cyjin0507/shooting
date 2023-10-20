let gameInstance

class Game {

    constructor(canvas) {
        if(gameInstance) return gameInstance

        this.ctx = canvas.getContext('2d')
        this.width = canvas.width
        this.height = canvas.height
        this.player = null
        this.enemeyList = []
        this.isActive = true

        gameInstance = this
        this.init()
    }

    init() {
        const {width, height} = this
        const playerData = {
            size : 10,
            color : '#22dbcf',
            x : width / 2,
            y : height / 2,
            speed : 5
        }
        this.player = new Player(playerData)

        for (let i=0; i<100; i++) {
            const enemyData = {
                size : 5,
                color : "red",
                speed : 3,
                spawnSide : Util.getRandomSpawnSide(),
            }
            const enemy = new Enemey(enemyData)
            this.enemeyList.push(enemy)

            setTimeout(()=> {
                enemy.isActive = true
            }, i * 100)
        }
        this.render()
    }

    render() {
        if(!this.isActive) return
        const { ctx, width, height } = this
        this.ctx.clearRect(0,0,width, height)
        this.player.render(ctx)
        this.enemeyList.forEach(enemy=>{
            enemy.render(ctx)
            const isCollision = enemy.checkCollision(this.player)
            if(isCollision) {
                this.isActive = false
                return true
                // alert('충돌')
            }
        })
        requestAnimationFrame(this.render.bind(this))
    }

}