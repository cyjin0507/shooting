const MARGIN = 20
const {abs, sqrt, pow} = Math

class Enemey extends Entity {
    constructor({size, color, speed, spawnSide}) {
        super({size, color, speed})
        this.spawnSide = spawnSide
        this.targetSide = (spawnSide + 2) % 4
        this.targetX = 0
        this.targetY = 0
        this.isActive = false
        this.init()
    }

    render(ctx) {
        if(!this.isActive) return
        this.move()

        if(this.isArrived) this.changeDirection()

        const {x, y, size, color, } = this

        ctx.beginPath()
        ctx.arc(x,y,size, 0, 2*Math.PI)
        ctx.fillStyle = color
        ctx.fill()
        ctx.closePath()
    }

    init() {
        const {spawnSide, targetSide} = this
        const {x:spawnX, y:spawnY} = this.getRandomPosition(spawnSide)
        const {x:targetX, y:targetY} = this.getRandomPosition(targetSide)
        this.x = spawnX
        this.y = spawnY
        this.targetX = targetX
        this.targetY = targetY
    }

    getRandomPosition(side) {
        const {width, height} = new Game()

        let x = 0
        let y = 0

        if(side == 0) {
            x = Util.getRandomNumber(0,width)
            y = -1* MARGIN
        }

        if(side == 1) {
            x = width + MARGIN
            y = Util.getRandomNumber(0, height)
        }

        if(side == 2) {
            x = Util.getRandomNumber(0,width)
            y = height + MARGIN
        }

        if(side == 3) {
            x = -1 * MARGIN
            y = Util.getRandomNumber(0, height)
        }

        return {x,y}
    }

    get isArrived() {
        const {x, y, targetX, targetY} =this
        const {width, height} = new Game()

        const result = (
            x < -1 * MARGIN ||
            x > width + MARGIN ||
            y < -1 * MARGIN ||
            y > height + MARGIN
        )

        return result
    }

    move() {
        const {speed, targetX, targetY, x, y} = this
        const distX = abs(targetX - x)
        const distY = abs(targetY -y)
        const sum = distX + distY
        
        const xDir = targetX > x ? 1 : -1;
        const yDir = targetY > y ? 1 : -1;

        const moveX = sqrt(distX / sum) * speed * xDir
        const moveY = sqrt(distY / sum) * speed * yDir

        this.x += moveX
        this.y += moveY
    }


    checkCollision(player) {
        const {x:myX,y:myY,size:mySize} = this
        const {x:playerX, y:playerY, size:playerSize} = player

        const distX = abs(myX - playerX)
        const distY = abs(myY - playerY)
        const hypo = sqrt(pow(distX,2) + pow(distY, 2))
        return (mySize + playerSize) > hypo
    }

    changeDirection() {
        const {spawnSide, targetSide} = this
        this.spawnSide = targetSide
        this.targetSide = spawnSide

        this.init()
    }

}