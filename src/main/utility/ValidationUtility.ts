abstract class ValidationUtility {
    static validateArrayAsNumber(value: any[]) {
        return value.every(element => typeof element == "number")
    }

    static validateArrayAsString(value: any[]) {
        return value.every(element => typeof element == "string")
    }

    static validateArrayAsBoolean(value: any[]) {
        value = value.map(element => {
            if ((typeof element == "string" && element.toLowerCase() == "Y") || (typeof element == "string" && element.toLowerCase() == "N")) return true
            return element
        })
        return value.every(element => typeof element == "boolean" || element == undefined)
    }

    static validateArrayAsISO8601(value: any[]) {
        const isoDateRegex = /^\d{4}-(0\d|1[0-2])-(0\d|[12]\d|3[01])$/;
        return value.every(element => isoDateRegex.test(element))
    }

    static validateUniqueness(value: any[]) {
        const newValue = value.filter(value => value != undefined)
        const setValue = new Set(newValue)
        return setValue.size == newValue.length
    }

    static validateArrayIn(value: any[], arrayAllow: string[]) {
        return value.filter(v => v != null && v !== "").every(v => arrayAllow.includes(String(v).toUpperCase()))
    }
}

export default ValidationUtility
