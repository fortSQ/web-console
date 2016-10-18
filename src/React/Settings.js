class Settings extends React.Component {
    constructor(props) {
        super(props)

        this.cityList = new CityList()
        this.transfer = this.transfer.bind(this)
    }

    transfer(type) {
        let ref = type === CityList.ACTIVE ? this._inactiveSelect : this._activeSelect
        let valueList = $(ref._select).val().map((item) => parseInt(item))
        this.cityList.transfer(valueList, type)
        this.setState()
    }

    render() {
        return (
            <div className="settings">
                <div className="enabled">
                    <CitySelect ref={(ref) => this._activeSelect = ref} type={CityList.ACTIVE} list={this.cityList} />
                </div>
                <div className="actions">
                    <TransferButton favicon="fa-chevron-up" type={CityList.ACTIVE} list={this.cityList} onClick={() => this.transfer(CityList.ACTIVE)} />
                    <TransferButton favicon="fa-chevron-down" type={CityList.INACTIVE} list={this.cityList} onClick={() => this.transfer(CityList.INACTIVE)} />
                </div>
                <div className="disabled">
                    <CitySelect ref={(ref) => this._inactiveSelect = ref} type={CityList.INACTIVE} list={this.cityList} />
                </div>
            </div>
        )
    }
}