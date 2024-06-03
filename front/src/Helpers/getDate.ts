// export function getDate(timestamp: number) {
//     let date = new Date(timestamp)
//     return (
//         `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`
//     )
// }

const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

function getDay(date: string) {
    if (date.length == 1) {
        return '0' + date
    } else return date
}

export function getDate(date: string) {
    const newDate = new Date(Date.parse(date))
    return getDay(String(newDate.getDate())) + '.' + months[newDate.getMonth()] + '.' + newDate.getFullYear()
}

export function getTime(date: string) {

    const newDate = new Date(Date.parse(date))
    if (String(newDate.getMinutes()).length === 1) {
        return newDate.getHours() + ':0' + newDate.getMinutes()
    } else {
        return newDate.getHours() + ':' + newDate.getMinutes()
    }

}

export function getOrderDate(date: string) {
    const newDate = new Date(Date.parse(date))

    return newDate.getDate() + ' ' + getMonthName(newDate.getMonth()) + ' ' + newDate.getFullYear()
}

function getMonthName(id: number) {
    switch (id) {
        case 0: return 'января'
        case 1: return 'февраля'
        case 2: return 'марта'
        case 3: return 'апреля'
        case 4: return 'мая'
        case 5: return 'июня'
        case 6: return 'июля'
        case 7: return 'августа'
        case 8: return 'сентября'
        case 9: return 'октября'
        case 10: return 'ноября'
        case 11: return 'декабря'
        default: { console.error('Нет такого месяца'); return }
    }
}