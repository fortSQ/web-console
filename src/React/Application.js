class Application extends React.Component {
    constructor(props) {
        super(props)
        // привязка контекста всем методам
        this.handle = this.handle.bind(this)

        this.commandHistory = new CommandHistory()
    }

    handle(e) {
        let event = new EventDecorator(e)
        let inputLine = this._console._input.state.value;

        if (event.isEnter()) {
            let outputToScreen = (text, isNewLine) => this._console._output.append(EOL +  (isNewLine ? '> ' : '') + text)

            if (inputLine) {
                this.commandHistory.addCommand(inputLine)
                // Передача id активных городов как параметрами для любой из команд
                let activeCityIdList = this._cityList.cityList.list[CityList.ACTIVE]
                let command = new Command(inputLine + ' ' + activeCityIdList.join(' '), this._cityList.cityList)

                outputToScreen(inputLine, true)
                command.run()
                    .then(outputToScreen)
                    .catch(outputToScreen)
            } else {
                outputToScreen('', true)
            }

            this._console._input.changeValue('')
        }

        if (event.isArrowUp()) {
            e.preventDefault()
            let lastCommand = this.commandHistory.previous()
            this._console._input.changeValue(lastCommand)
        }
        if (event.isArrowDown()) {
            let lastCommand = this.commandHistory.next()
            this._console._input.changeValue(lastCommand)
        }
    }

    render() {
        return (
            <div className="application">
                <Console ref={(ref) => this._console = ref} handler={this.handle} />
                <Settings ref={(ref) => this._cityList = ref} />
            </div>
        )
    }
}