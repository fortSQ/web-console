interface ICityList {
    list: {}
    nameList: {}
    transfer(idList: number[], typeTo: string): void
}

class CityList implements ICityList {
    static ACTIVE = 'active'
    static INACTIVE = 'inactive'

    static VORONEZH = 36
    static UKHTA = 11
    static MOSCOW = 77
    static SAINT_PETERSBURG = 78

    public list = {
        [CityList.ACTIVE]: [CityList.VORONEZH, CityList.UKHTA],
        [CityList.INACTIVE]: [CityList.MOSCOW, CityList.SAINT_PETERSBURG],
    }

    public nameList = {
        [CityList.VORONEZH]: 'Воронеж',
        [CityList.UKHTA]: 'Ухта',
        [CityList.MOSCOW]: 'Москва',
        [CityList.SAINT_PETERSBURG]: 'Санкт-Петербург',
    }

    public transfer(idList: number[], typeTo: string): void {
        let typeFrom = typeTo == CityList.ACTIVE ? CityList.INACTIVE : CityList.ACTIVE

        idList.forEach((id) => {
            if (!this.list[typeFrom].includes(id)
                || this.list[typeTo].includes(id)
            ) return // если вдруг не нашли элемент в извлекаемом списке или он уже есть в нужном

            this.list[typeTo].push(id)
        })

        this.list[typeFrom] = this.list[typeFrom].filter((id) => !idList.includes(id))
    }
}