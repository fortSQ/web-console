class TransferButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick}>
                <i className={'fa fa-fw ' + this.props.favicon}></i>
            </button>
        )
    }
}