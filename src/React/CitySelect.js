class CitySelect extends React.Component {
    render() {
        let cityNameList = this.props.list.nameList
        return (
            <select multiple ref={(ref) => this._select = ref}>
                {
                    this.props.list.list[this.props.type].map((item) => (
                        <option value={item}>{cityNameList[item]}</option>
                    ))
                }
            </select>
        )
    }
}