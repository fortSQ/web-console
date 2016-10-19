class CityList {
    constructor() {
        this.list = {
            [CityList.ACTIVE]: [CityList.VORONEZH, CityList.UKHTA],
            [CityList.INACTIVE]: [CityList.MOSCOW, CityList.SAINT_PETERSBURG],
        };
        this.nameList = {
            [CityList.VORONEZH]: 'Воронеж',
            [CityList.UKHTA]: 'Ухта',
            [CityList.MOSCOW]: 'Москва',
            [CityList.SAINT_PETERSBURG]: 'Санкт-Петербург',
        };
    }
    transfer(idList, typeTo) {
        let typeFrom = typeTo == CityList.ACTIVE ? CityList.INACTIVE : CityList.ACTIVE;
        idList.forEach((id) => {
            if (!this.list[typeFrom].includes(id)
                || this.list[typeTo].includes(id))
                return;
            this.list[typeTo].push(id);
        });
        this.list[typeFrom] = this.list[typeFrom].filter((id) => !idList.includes(id));
    }
}
CityList.ACTIVE = 'active';
CityList.INACTIVE = 'inactive';
CityList.VORONEZH = 36;
CityList.UKHTA = 11;
CityList.MOSCOW = 77;
CityList.SAINT_PETERSBURG = 78;
