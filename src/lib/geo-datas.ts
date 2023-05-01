import {Country, State, City} from 'country-state-city'

export const cityNames = City.getAllCities().map((cityInfo) => cityInfo.name)
export const states = State.getAllStates()
export const countries = Country.getAllCountries()

export const cities = City.getAllCities()

export function getCountryByCityName(cityName: string) {
    var i = 0
    const len = cities.length
    while (i < len) {
        if (cities[i].name === cityName) {
            return cities[i].countryCode
        }
        i += 1
    }
}
