const SpanHoursDate = document.getElementById('SpanHoursDate')

const NewDate = () => {
    const FormatTime = n => n < 10 ? `0${n}` : n
    const New_Date = new Date()

    let Hora = FormatTime(New_Date.getHours())
    let Minuto = FormatTime(New_Date.getMinutes())
    let Segundo = FormatTime(New_Date.getSeconds())
    let Dia = FormatTime(New_Date.getDate())
    let Mes = FormatTime(New_Date.getMonth() + 1)
    let Ano = FormatTime(New_Date.getFullYear())

    const FormatHours = `${Hora}:${Minuto}:${Segundo}`
    const FormatDate = `${Dia}:${Mes}:${Ano}`

    return {Hora: FormatHours, Data: FormatDate}
}

setInterval(() => {
    SpanHoursDate.textContent = `${NewDate().Data} / ${NewDate().Hora}`
})
