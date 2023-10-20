class Util {
    static getRandomSpawnSide() {
        const result =  ~~(Math.random() * 4)
        return result
    }

    static getRandomNumber(start, end) {
        const diff = Math.abs(end - start) + 1
        const result = ~~(Math.random() * diff) + start
        return result
    }
}