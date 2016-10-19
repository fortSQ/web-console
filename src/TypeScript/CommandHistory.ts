interface ICommandHistory {
    addCommand(command: string): void
    previous(): string
    next(): string
}

class CommandHistory {
    private commandList = []
    private position = null
    private defaultValue

    public constructor(defaultValue: string = '') {
        this.defaultValue = defaultValue
    }

    public addCommand(command: string): void {
        if (command !== this.commandList[this.commandList.length - 1]) {
            this.commandList.push(command)
        }
        this.position = null
    }

    public previous(): string {
        if (this.commandList.length == 0) return this.defaultValue
        if (null === this.position) this.position = this.commandList.length

        this.position--

        if (this.position < 0) {
            this.position = 0
        }

        return this.commandList[this.position]
    }

    public next(): string {
        if (this.commandList.length == 0 || null === this.position) return this.defaultValue

        this.position++

        if (this.position >= this.commandList.length) {
            this.position = this.commandList.length
            return this.defaultValue
        }

        return this.commandList[this.position]
    }
}