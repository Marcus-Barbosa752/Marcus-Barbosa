const BtnObterCotacao = document.getElementById('BtnObterCotacao')
const BtnBackCotacao = document.getElementById('BtnBackCotacao')

const InputMoedaUm = document.getElementById('InputMoedaUm')
const InputMoedaDois = document.getElementById('InputMoedaDois')
const selectMoeda = document.getElementById('InputMoedaUm')
const selectLocal = document.getElementById('InputMoedaDois')

const SpanPrintValorAtual = document.getElementById('SpanPrintValorAtual')

const Form = document.getElementById("Form")
const Result = document.getElementById('Result')
const ResultInfo = document.getElementById('ResultInfo')

async function Cotacao() {
    const code = selectMoeda.value.trim()
    const local = selectLocal.value.trim()

    if (!code || !local) {
        alert('Por favor, selecione ambas as moedas.')
        return
    }

    const pair = `${code}-${local}`
    const url = `https://economia.awesomeapi.com.br/json/last/${pair}`

    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Erro na requisição: ${res.status}`)
        }

        const data = await res.json()
        const key = `${code}${local}`
        const info = data[key]

        if (!info) {
            throw new Error('Dados de moeda não encontrados')
        }

        SpanPrintValorAtual.textContent = `${Number(info.bid).toFixed(2)}`

        ResultInfo.innerHTML = `
        <h2>${info.name}</h2>
        <div class="campo"><strong>Compra (bid):</strong> ${Number(info.bid).toLocaleString('pt-BR', { style: 'currency', currency: local })}</div>
        <div class="campo"><strong>Venda (ask):</strong> ${Number(info.ask).toLocaleString('pt-BR', { style: 'currency', currency: local })}</div>
        <div class="campo"><strong>Máxima (high):</strong> ${Number(info.high).toLocaleString('pt-BR', { style: 'currency', currency: local })}</div>
        <div class="campo"><strong>Mínima (low):</strong> ${Number(info.low).toLocaleString('pt-BR', { style: 'currency', currency: local })}</div>
        <div class="campo"><strong>Variação (%):</strong> ${info.pctChange}%</div>
        <div class="campo"><strong>Última atualização:</strong> ${info.create_date}</div>
    `

    selectMoeda.value = ''
    selectLocal.value = ''
    }catch (err) {
        ResultInfo.innerHTML = `<p style="color:red; text-align: center;">${err.message}</p>`
        console.error(err)
    }
}

BtnObterCotacao.addEventListener('click', (e) => {
    e.preventDefault()

    if (!InputMoedaUm.value) {
        InputMoedaUm.style.background = 'tomato'
        InputMoedaUm.addEventListener('click', () => {
            InputMoedaUm.style.background = 'none'
        })
        
    }

    if (!InputMoedaDois.value) {
        InputMoedaDois.style.background = 'tomato'
        InputMoedaDois.addEventListener('click', () => {
            InputMoedaDois.style.background = 'none'
        })
        return
    }

    Form.style.height = '0'
    Result.style.height = 'auto'

    BtnBackCotacao.onclick = () => {
        Form.style.height = 'auto'
        Result.style.height = '0'
    }

    Cotacao()
})