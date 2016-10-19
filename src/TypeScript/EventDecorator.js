var KEY_CODE;
(function (KEY_CODE) {
    KEY_CODE[KEY_CODE["Enter"] = 13] = "Enter";
    KEY_CODE[KEY_CODE["ArrowUp"] = 38] = "ArrowUp";
    KEY_CODE[KEY_CODE["ArrowDown"] = 40] = "ArrowDown";
})(KEY_CODE || (KEY_CODE = {}));
class EventDecorator {
    constructor(event) {
        this.event = event;
    }
    equalKeyCode(keyCode) {
        return keyCode === this.event.keyCode;
    }
    isEnter() {
        return this.equalKeyCode(KEY_CODE.Enter);
    }
    isArrowUp() {
        return this.equalKeyCode(KEY_CODE.ArrowUp);
    }
    isArrowDown() {
        return this.equalKeyCode(KEY_CODE.ArrowDown);
    }
}
