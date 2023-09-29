

export function getDate () {
    let data_consulta = ''
    const data = new Date()
    const day = data.getDate()
    const month = data.getMonth() + 1
    const year = data.getFullYear()
    const hour = data.getHours()
    const minute = data.getMinutes()
    const seconds = data.getSeconds()
    data_consulta = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year} às ${hour}:${minute}:${seconds.toFixed()}`
    return data_consulta
}

export function formatDate (dt: string) {
    let date = new Date(dt)
    let dateFormated = date 
        ? Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(date)
        : ''
    return dateFormated
}

export function formatCapital (capital: number) 
{
    let response = capital 
        ? new Intl.NumberFormat('pt-BR', {currency: 'BRL', style: 'currency'}).format(capital)
        : ''
    return response
}
