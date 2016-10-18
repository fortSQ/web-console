class Output extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: `Курсовой проект по web-технологиям${EOL}Дмитрий Романов, ВГТУ ИПм-151${EOL}`
        }
    }

    append(text) {
        this.setState({text: this.state.text + text})
    }

    render() {
        return (
            <textarea readOnly id="out" rows="4" ref={(ref) => this._textarea = ref} value={this.state.text} />
        )
    }

    componentDidUpdate() {
        $(this._textarea).scrollTop($(this._textarea)[0].scrollHeight); // крутим мопэд вниз
    }
}