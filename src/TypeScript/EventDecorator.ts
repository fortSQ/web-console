interface Event {
    keyCode: number
}

enum KEY_CODE {Enter = 13, ArrowUp = 38, ArrowDown = 40}

interface IEventDecorator {
    isEnter(): boolean
    isArrowUp(): boolean
    isArrowDown(): boolean
}

class EventDecorator implements IEventDecorator {
    private event: Event

    public constructor(event: Event) {
        this.event = event
    }

    private equalKeyCode(keyCode): boolean {
        return keyCode === this.event.keyCode
    }

    public isEnter(): boolean {
        return this.equalKeyCode(KEY_CODE.Enter)
    }

    public isArrowUp(): boolean {
        return this.equalKeyCode(KEY_CODE.ArrowUp)
    }

    public isArrowDown(): boolean {
        return this.equalKeyCode(KEY_CODE.ArrowDown)
    }
}