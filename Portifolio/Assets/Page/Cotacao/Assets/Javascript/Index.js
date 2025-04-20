const BtnObterCotacao = document.getElementById('BtnObterCotacao')
const BtnBackCotacao = document.getElementById('BtnBackCotacao')
const BtnCalcCotacoes = document.getElementById('BtnCalcCotacoes')
const BtnBackHome = document.getElementById("BtnBackHome")

const InputMoedaUm = document.getElementById('InputMoedaUm')
const InputMoedaDois = document.getElementById('InputMoedaDois')
const selectMoeda = document.getElementById('InputMoedaUm')
const selectLocal = document.getElementById('InputMoedaDois')

const SpanPrintValorAtual = document.getElementById('SpanPrintValorAtual')

const Form = document.getElementById("Form")
const Result = document.getElementById('Result')
const ResultInfo = document.getElementById('ResultInfo')
const CalcMoedas = document.getElementById('CalcMoedas')

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
    } catch (err) {
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

BtnCalcCotacoes.onclick = (e) => {
    e.preventDefault()
    Form.style.height = '0'
    CalcMoedas.style.height = 'auto'

    BtnBackHome.onclick = () => {
        Form.style.height = 'auto'
        CalcMoedas.style.height = '0'
    }
}

// Calculadora
const SpanResultCalcMoedas = document.getElementById('SpanResultCalcMoedas')
const SpanPreviaCalcMoedas = document.getElementById('SpanPreviaCalcMoedas')
const SpanMoedaPadrao = document.getElementById('SpanMoedaPadrao')

const InputMoedaUmCalc = document.getElementById("InputMoedaUmCalc")
const InputMoedaDoisCalc = document.getElementById("InputMoedaDoisCalc")

const BtnReverterMoeda = document.getElementById("BtnReverterMoeda")

let ResultMoeda = 0

BtnReverterMoeda.onclick = () => {
    if (!InputMoedaUmCalc.value || !InputMoedaDoisCalc.value) {
        alert("Nada reverter!")
        return
    }

    const temp = InputMoedaUmCalc.value
    InputMoedaUmCalc.value = InputMoedaDoisCalc.value
    InputMoedaDoisCalc.value = temp
}

function Insert(num) {
    if (SpanPreviaCalcMoedas.textContent === "00+00") {
        SpanPreviaCalcMoedas.textContent = ''
    }

    if (SpanMoedaPadrao.textContent !== "00.00") {
        const preview = SpanPreviaCalcMoedas
        const padrao = SpanMoedaPadrao.textContent
        const ops = ['+', '-', 'x', '%']
    
        // Se for dígito (ou ponto), só anexa normalmente
        if (!ops.includes(num)) {
            // Se o preview só tiver "0" inicial, substitui por num
            if (preview.textContent === '0') {
                preview.textContent = num
    
            }else {
                preview.textContent += num
            }
            return
        }
    
        // Se for operador, e o último caractere NÃO for um operador, anexa operador + valor padrão
        const last = preview.textContent.slice(-1)
    
        if (!ops.includes(last)) {
            preview.textContent += num + padrao
        }

    }else {
        SpanPreviaCalcMoedas.textContent += num
    }
}

function Calc() {
    const CalcSimples = () => {
        if (SpanPreviaCalcMoedas.textContent === "00+00" || !SpanPreviaCalcMoedas.textContent) {
            alert('Nada pra calcular!')
            return
        }

        const Result = eval(SpanPreviaCalcMoedas.textContent)

        SpanResultCalcMoedas.textContent = Result.toFixed(2)
        SpanPreviaCalcMoedas.textContent = ''
    }

    const CalcCotacao = async () => {
        const code = InputMoedaUmCalc.value.trim()
        const local = InputMoedaDoisCalc.value.trim()

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

            ResultMoeda = Number(info.bid).toFixed(2)
            SpanMoedaPadrao.textContent = Number(info.bid).toFixed(2)

        } catch (err) {
            ResultInfo.innerHTML = `<p style="color:red; text-align: center;">${err.message}</p>`
            console.error(err)
        }
    }

    if (!InputMoedaUmCalc.value && !InputMoedaDoisCalc.value) CalcSimples()
    else CalcCotacao()
}

function Pocentagem() {
    if (SpanPreviaCalcMoedas.textContent === "00+00" || !SpanPreviaCalcMoedas.textContent) {
        alert('Nada pra calcular!')
        return
    }

    const Pocen = SpanPreviaCalcMoedas.textContent / 1000

    SpanResultCalcMoedas.textContent = Pocen
    SpanPreviaCalcMoedas.textContent = ''
}

function Clean() {
    if (SpanResultCalcMoedas.textContent == "00") {
        alert('Nada pra limpar!')
        return
    }

    SpanResultCalcMoedas.textContent = '00'
    SpanPreviaCalcMoedas.textContent = '00+00'
}

function BackSpace() {
    SpanPreviaCalcMoedas.textContent = SpanPreviaCalcMoedas.textContent.substring(0, SpanPreviaCalcMoedas.textContent.length -1)
}
