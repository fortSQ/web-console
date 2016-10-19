/// <reference path="./jquery" />

const EOL = '\r\n'

interface ICommand {
    run(): Promise<string>
}

class Command implements ICommand {
    private command: string
    private argumentList: any[]

    private cityList: CityList

    private commandList = {
        '?': this.helpCommand,
        'help': this.helpCommand,
        'date': this.dateCommand,
        'time': this.timeCommand,
        'ping': this.pingCommand,
        'weather': this.weatherCommand,
        'traffic': this.trafficCommand,
    }

    public constructor(inputLine: string, cityList: CityList) {
        let inputLineAsArray = inputLine.split(' ').map(item => item.trim())
        this.command = inputLineAsArray.shift()
        this.argumentList = inputLineAsArray

        this.cityList = cityList
    }

    public run(): Promise<string> {
        return Promise.resolve(this.command)
            .then(this.prepare.bind(this))
            .then(this.execute.bind(this))
    }

    private prepare(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.command in this.commandList) {
                resolve(this.command)
            } else {
                reject(this.command + ': команда не найдена')
            }
        })
    }

    private execute(): Promise<string> {
        return new Promise(this.commandList[this.command].bind(this))
    }

    private pingCommand(resolve) {
        resolve('pong')
    }

    private helpCommand(resolve) {
        resolve(
            `Доступные команды:
ping\t\t- проверка работоспособности консоли
date\t\t- текущая дата
time\t\t- текущее время
weather\t\t- погода для активных городов
traffic\t\t- пробки для активных городов`
        )
    }

    private dateCommand(resolve) {
        resolve(
            (new Intl.DateTimeFormat('ru', {day: 'numeric', month: 'long', year: 'numeric'}))
                .format(new Date)
        )
    }

    private timeCommand(resolve) {
        resolve(
            (new Date).toLocaleString('ru', {hour: 'numeric', minute: 'numeric', second: 'numeric'})
        )
    }

    private weatherCommand(resolve, reject) {
        const openweathermapApiKey = '80492ef90c36a190f2a306ffa515df5a'
        const openweathermapUnits = 'metric'
        const mappingIdList = {
            [CityList.VORONEZH]: 472045,
            [CityList.UKHTA]: 479411,
            [CityList.MOSCOW]: 524901,
            [CityList.SAINT_PETERSBURG]: 498817,
        }
        let idList = this.argumentList.map((item) => {
            item = parseInt(item)
            return mappingIdList[item]
        })
        let openweathermapUrl = 'http://api.openweathermap.org/data/2.5/group?id=:id&units=:units&APPID=:appid'
            .replace(':units', openweathermapUnits)
            .replace(':appid', openweathermapApiKey)
            .replace(':id', idList.join(','))

        $.getJSON(openweathermapUrl)
            .done((data) => {
                let resultObject = {}
                data.list.forEach((item) => {
                    resultObject[item.id] = item.main.temp
                })

                let result = []
                this.argumentList.forEach((cityId) => {
                    let keyId = mappingIdList[cityId]
                    result.push(this.cityList.nameList[cityId] + ': ' + (keyId in resultObject ? resultObject[keyId] : 'нет данных'))
                })
                resolve(result.join(EOL))
            })
            .fail(() => reject('Error connecting with openweathermap.org :('))
    }

    private trafficCommand(resolve, reject) {
        const url = 'http://jgo.maps.yandex.net/trf/stat.js'
        const mappingIdList = {
            [CityList.VORONEZH]: 193,
            [CityList.UKHTA]: 10945,
            [CityList.MOSCOW]: 213,
            [CityList.SAINT_PETERSBURG]: 2,
        }
        let idList = this.argumentList.map((item) => {
            item = parseInt(item)
            return mappingIdList[item]
        })

        let that = this
        window.YMaps = {Hotspots: {Loader: {onLoad(_, response) {
            let regions = response['regions']
            let levelList = {}
            regions.forEach((regionObject) => {
                if (idList.includes(parseInt(regionObject.regionId))) {
                    levelList[regionObject.regionId] = regionObject.level
                }
            })

            let result = []
            that.argumentList.forEach((cityId) => {
                let keyId = mappingIdList[cityId]
                result.push(that.cityList.nameList[cityId] + ': ' + (keyId in levelList ? levelList[keyId] : 'нет данных'))
            })
            resolve(result.join(EOL))
        }}}}

        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'YMaps.Hotspots.onLoad', // в адреса уже завернуто в такой JSONP
        })
            .fail((XHR, status, error) => console.log(error)) // почему-то возвращается error
    }
}