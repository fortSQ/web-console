/**
 * Города
 */
class CityList {
    static get ACTIVE () { return 'active' }
    static get INACTIVE () { return 'inactive' }

    static get VORONEZH () { return 36 }
    static get UKHTA () { return 11 }
    static get MOSCOW () { return 77 }
    static get SAINT_PETERSBURG () { return 78 }

    constructor(){
        this.list = {
            [this.constructor.ACTIVE]: [this.constructor.VORONEZH, this.constructor.UKHTA],
            [this.constructor.INACTIVE]: [this.constructor.MOSCOW, this.constructor.SAINT_PETERSBURG],
        }
    }

    get nameList() {
        return {
            [this.constructor.VORONEZH]: 'Воронеж',
            [this.constructor.UKHTA]: 'Ухта',
            [this.constructor.MOSCOW]: 'Москва',
            [this.constructor.SAINT_PETERSBURG]: 'Санкт-Петербург',
        }
    }

    transfer(idList, typeTo) {
        let typeFrom = typeTo == this.constructor.ACTIVE ? this.constructor.INACTIVE : this.constructor.ACTIVE

        idList.forEach((id) => {
            if (!this.list[typeFrom].includes(id)
                || this.list[typeTo].includes(id)
            ) return // если вдруг не нашли элемент в извлекаемом списке или он уже есть в нужном

            this.list[typeTo].push(id)
        })

        this.list[typeFrom] = this.list[typeFrom].filter((id) => !idList.includes(id))
    }
}