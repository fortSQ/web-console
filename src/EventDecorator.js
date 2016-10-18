/**
 * Обёртка для события
 */
class EventDecorator {
    static get keyCodeList() {
        return {
            enter: 13,
            arrowUp: 38,
            arrowDown: 40,
        }
    }

    constructor(event) {
        this.event = event
    }

    equalKeyCode(keyCode) {
        return this.constructor.keyCodeList[keyCode] === this.event.keyCode
    }

    isEnter() {
        return this.equalKeyCode('enter')
    }

    isArrowUp() {
        return this.equalKeyCode('arrowUp')
    }

    isArrowDown() {
        return this.equalKeyCode('arrowDown')
    }
}