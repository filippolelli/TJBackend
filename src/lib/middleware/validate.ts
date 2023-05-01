import {City} from 'country-state-city'
import {NextFunction, Response, Request} from 'express'
import {matchedData, validationResult, Location} from 'express-validator'

function equals(a: string[], b: string[]) {
    return a.length === b.length && a.every((val, index) => val === b[index])
}

export function validate(location: Location) {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        const toCheck =
            location === 'body'
                ? req.body
                : location === 'params'
                ? req.params
                : undefined
        const obj = matchedData(req, {
            includeOptionals: true,
            locations: [location],
        })

        Object.keys(obj).forEach(
            (key) => obj[key] === undefined && delete obj[key]
        )

        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()})

        if (!equals(Object.keys(toCheck).sort(), Object.keys(obj).sort()))
            return res.status(400).json('fields not valid')
        return next()
    }
}

export const validateCities = (
    reqCities: {name: string; country: string}[]
) => {
    let ok: number = 0
    reqCities.forEach((city_state: {name: string; country: string}) => {
        const validCities = City.getCitiesOfCountry(city_state.country)

        const len = validCities.length
        var i = 0
        while (i < len) {
            if (validCities[i].name === city_state.name) {
                ok += 1
                return
            }
            i += 1
        }
    })
    return ok === reqCities.length
}
