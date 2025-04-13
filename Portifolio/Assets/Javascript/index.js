import { CarregarProdutos } from "./Produtos.js"

const BtnOpenSocial = document.getElementById('BtnOpenSocial')
const ContainerSocial = document.getElementById('ContainerSocial')

BtnOpenSocial.onclick = () => {
    const Itag = document.getElementById('Itag')
    Itag.style.transition = '.4s ease-in-out'

    if (Itag.style.transform != 'rotate(180deg)') {
        Itag.style.transform = 'rotate(180deg)'
    }else {
        Itag.style.transform = 'rotate(0deg)'
    }

    ContainerSocial.classList.toggle('Open')
}

// SliderShow
const PrintImageBanner = document.getElementById('PrintImageBanner')
const RightContainer = document.querySelector('.Right')

const ProdutosList = []
let indexAtual = 0

function GerarListaDeProdutos() {
    if (ProdutosList.length === 0) return

    const titleEl = document.createElement('h2')
    const descEl = document.createElement('p')

    titleEl.className = "BannerTitle"
    descEl.className = "BannerDesc"

    PrintImageBanner.prepend(titleEl)
    PrintImageBanner.appendChild(descEl)

    function trocarBanner(index = indexAtual) {
        const produto = ProdutosList[index]
        PrintImageBanner.style.backgroundImage = `url(${produto.Src})`
        PrintImageBanner.style.backgroundSize = 'cover'
        PrintImageBanner.style.backgroundPosition = 'center'

        titleEl.textContent = produto.Title
        descEl.textContent = produto.Description

        indexAtual = (index + 1) % ProdutosList.length
        renderCards()
    }

    function renderCards() {
        RightContainer.innerHTML = ""

        for (let i = 1; i <= 3; i++) {
            const proxIndex = (indexAtual + i) % ProdutosList.length
            const produto = ProdutosList[proxIndex]

            const card = document.createElement('div')
            card.className = "CardBannerProxImage"
            card.style.backgroundImage = `url(${produto.Src})`
            card.title = produto.Title

            card.addEventListener('click', () => {
                indexAtual = proxIndex
                trocarBanner(proxIndex)
            })

            RightContainer.appendChild(card)
        }
    }

    trocarBanner()
    setInterval(() => trocarBanner(indexAtual), 4000)
}

CarregarProdutos(ProdutosList, GerarListaDeProdutos)

// Categoria
const TemasProjetos = document.querySelector('.TemasProjetos')

const ListaCategoria = [
    {
        Nome: 'E-commerce',
        Link: 'https://www.youtube.com'
    },
    {
        Nome: 'Movie',
        Link: 'https://www.youtube.com'
    },
    {
        Nome: 'Player',
        Link: 'https://www.youtube.com'
    },
    {
        Nome: 'Jogos',
        Link: 'https://www.youtube.com'
    },
]

const CreateCardCatergoria = (Titulo, Link) => {
    const Card = `
    <div class="CardTemaProjetos">
        <h4>${Titulo}</h4>
        <button><a href=f"${Link}" target="_blank">Acessar</a><i class="fa-solid fa-caret-right"></i></button>
    </div>
    `

    TemasProjetos.innerHTML += Card
}

for (let i = 0; i < ListaCategoria.length; i++) {
    CreateCardCatergoria(ListaCategoria[i].Nome, ListaCategoria[i].Link)
}

// Minhas tecnologias
const MinhasTecnologias = document.getElementById('MinhasTecnologias')

const BgMinhasTecnologias = [
    'Assets/Images/Minhas tecnologias/Um.gif',
    'Assets/Images/Minhas tecnologias/Dois.gif',
    'Assets/Images/Minhas tecnologias/Trez.gif',
    'Assets/Images/Minhas tecnologias/Quatro.gif'
]

const Apl = () => {
    const BgRandom = BgMinhasTecnologias[Math.floor(Math.random() * BgMinhasTecnologias.length)]
    MinhasTecnologias.style.background = `url('${BgRandom}'), #444`
    MinhasTecnologias.style.backgroundPosition = 'center'
    MinhasTecnologias.style.backgroundSize = 'cover'
}
Apl()