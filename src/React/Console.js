class Console extends React.Component {
    render() {
        return (
            <div className="console">
                <div className="output">
                    <Output ref={(ref) => this._output = ref} />
                </div>
                <div className="input">
                    <span className="arrow">&gt;</span>
                    <Input ref={(ref) => this._input = ref} onKeyDown={this.props.handler} placeholder="введите команду..." />
                </div>
            </div>
        )
    }
}