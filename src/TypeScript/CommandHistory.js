class CommandHistory {
    constructor(defaultValue = '') {
        this.commandList = [];
        this.position = null;
        this.defaultValue = defaultValue;
    }
    addCommand(command) {
        if (command !== this.commandList[this.commandList.length - 1]) {
            this.commandList.push(command);
        }
        this.position = null;
    }
    previous() {
        if (this.commandList.length == 0)
            return this.defaultValue;
        if (null === this.position)
            this.position = this.commandList.length;
        this.position--;
        if (this.position < 0) {
            this.position = 0;
        }
        return this.commandList[this.position];
    }
    next() {
        if (this.commandList.length == 0 || null === this.position)
            return this.defaultValue;
        this.position++;
        if (this.position >= this.commandList.length) {
            this.position = this.commandList.length;
            return this.defaultValue;
        }
        return this.commandList[this.position];
    }
}
