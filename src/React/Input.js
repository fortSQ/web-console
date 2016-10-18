class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this)
    }

    changeValue(value) {
        this.setState({value: value})
    }

    handleChange(newValue) {
        this.setState({value: newValue})
    }

    render() {
        let valueLink = {
            value: this.state.value,
            requestChange: this.handleChange
        }; // обработка ввода
        return (
            <input
                ref={(ref) => this._input = ref}
                type="text"
                placeholder={this.props.placeholder}
                onKeyDown={this.props.onKeyDown}
                valueLink={valueLink}
            />
        )
    }
}