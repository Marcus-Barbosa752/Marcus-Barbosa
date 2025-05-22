import { CarregarProdutos } from "./Produtos.js"
import { CreateIframePdf } from "./CarregaPdf.js"

const BtnOpenSocial = document.getElementById('BtnOpenSocial')
const ContainerSocial = document.getElementById('ContainerSocial')

BtnOpenSocial.onclick = () => {
    const Itag = document.getElementById('Itag')
    Itag.style.transition = '.4s ease-in-out'

    if (Itag.style.transform != 'rotate(180deg)') {
        Itag.style.transform = 'rotate(180deg)'
    } else {
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
        Link: 'https://www.wix.com',
        Background: 'Assets/Images/E-commerce.jpg'
    },
    {
        Nome: 'Movie',
        Link: 'https://www.youtube.com',
        Background: 'Assets/Images/Movie.jpg'
    },
    {
        Nome: 'Player',
        Link: "https://www.google.com",
        Background: 'Assets/Images/Player.png'
    },
    {
        Nome: 'Jogos',
        Link: 'https://www.fronteditor.dev/',
        Background: 'Assets/Images/Jogos.jpg'
    },
    {
        Nome: 'Outros',
        Link: 'Assets/Page/Cotacao/Index.html',
        Background: 'Assets/Images/Outros.jpeg'
    }
]

const CreateCardCatergoria = (Titulo, Link, Fundo) => {
    const Card = `
    <div class="CardTemaProjetos" style="background: url(${Fundo}); background-position: center; background-size: cover;">
        <h4>${Titulo}</h4>
        <button><a href="${Link}" target="_blank">Acessar</a><i class="fa-solid fa-caret-right"></i></button>
    </div>
    `

    TemasProjetos.innerHTML += Card
}

for (let i = 0; i < ListaCategoria.length; i++) {
    CreateCardCatergoria(ListaCategoria[i].Nome, ListaCategoria[i].Link, ListaCategoria[i].Background)
}

// Minhas tecnologias
const MinhasTecnologias = document.getElementById('MinhasTecnologias')

const BgMinhasTecnologias = [
    'Assets/Images/Minhas tecnologias/Um.gif',
    'Assets/Images/Minhas tecnologias/Dois.gif',
    'Assets/Images/Minhas tecnologias/Trez.gif',
    'Assets/Images/Minhas tecnologias/Quatro.gif'
]

const RandomBgMyTech = () => {
    const BgRandom = BgMinhasTecnologias[Math.floor(Math.random() * BgMinhasTecnologias.length)]
    MinhasTecnologias.style.background = `url('${BgRandom}'), #444`
    MinhasTecnologias.style.backgroundPosition = 'center'
    MinhasTecnologias.style.backgroundSize = 'cover'
}
RandomBgMyTech()

// Projetos
const BtnToggleGridProjetos = document.getElementById('BtnToggleGridProjetos')
const CardProjetos = document.querySelectorAll('.CardProjetos')

BtnToggleGridProjetos.onclick = () => {
    BtnToggleGridProjetos.style.transition = '.4s ease-in-out'
    if (BtnToggleGridProjetos.style.transform != "rotate(90deg)") {
        BtnToggleGridProjetos.style.transform = "rotate(90deg)"
    } else {
        BtnToggleGridProjetos.style.transform = "rotate(0deg)"
    }

    CardProjetos.forEach(Card => {
        Card.classList.toggle('CardCollunm')
        console.log(Card.style.background)
    })
}

// Sobre - Carregar pdf
const BtnMarcusSobre = document.getElementById('BtnMarcusSobre')
const BtnCurriculoSobre = document.getElementById('BtnCurriculoSobre')
const ProjetosDaTechSobre = document.getElementById('ProjetosDaTechSobre')
const IndicatoSessionSobre = document.getElementById('IndicatoSessionSobre')

const PrintResSobre = document.getElementById('PrintResSobre')

const LinkPdf = '/Assets/Curriculo/curriculo_marcus_barbosa_ptbr.pdf'

BtnMarcusSobre.onclick = () => {
    PrintResSobre.innerHTML = ''
    PrintResSobre.innerHTML = "Marcus detalhes"
    IndicatoSessionSobre.style.left = "13px"
}

ProjetosDaTechSobre.onclick = () => {
    const Card = `
    <div class="ProjetosDasTecnologias">
        <div class="Card">
            <img src="Assets/Images/Python.png" alt="">
            <section> <!-- Colocar Mais projetos na section -->
                <div class="Rigth">
                    <img src="Assets/Images/Icon/task.png" alt="">
                    <div class="Info">
                        <h4>To-do list</h4>
                        <h4>10/10/1010</h4>
                    </div>

                    <div class="Controls">
                        <button>Github</button>
                        <button>Baixar</button>
                    </div>
                </div>

                <div class="Rigth">
                    <img src="Assets/Images/Icon/play.png" alt="">
                    <div class="Info">
                        <h4>To-do list</h4>
                        <h4>10/10/1010</h4>
                    </div>

                    <div class="Controls">
                        <button>Github</button>
                        <button>Baixar</button>
                    </div>
                </div>
            </section>
        </div>

        <div class="Card">
            <img src="Assets/Images/Cpp.png" alt="">
            <section> <!-- Colocar Mais projetos na section -->
                <div class="Rigth">
                    <img src="Assets/Images/Icon/task.png" alt="">
                    <div class="Info">
                        <h4>To-do list</h4>
                        <h4>10/10/1010</h4>
                    </div>

                    <div class="Controls">
                        <button>Github</button>
                        <button>Baixar</button>
                    </div>
                </div>

                <div class="Rigth">
                    <img src="Assets/Images/Icon/play.png" alt="">
                    <div class="Info">
                        <h4>To-do list</h4>
                        <h4>10/10/1010</h4>
                    </div>

                    <div class="Controls">
                        <button>Github</button>
                        <button>Baixar</button>
                    </div>
                </div>
            </section>
        </div>

        <div class="Card">
            <img src="Assets/Images/Js.png" alt="">
            <section> <!-- Colocar Mais projetos na section -->
                <div class="Rigth">
                    <img src="Assets/Images/Icon/task.png" alt="">
                    <div class="Info">
                        <h4>To-do list</h4>
                        <h4>10/10/1010</h4>
                    </div>

                    <div class="Controls">
                        <button>Github</button>
                        <button>Baixar</button>
                    </div>
                </div>

                <div class="Rigth">
                    <img src="Assets/Images/Icon/play.png" alt="">
                    <div class="Info">
                        <h4>To-do list</h4>
                        <h4>10/10/1010</h4>
                    </div>

                    <div class="Controls">
                        <button>Github</button>
                        <button>Baixar</button>
                    </div>
                </div>
            </section>
        </div>

        <div class="Card">
            <img src="Assets/Images/Java.png" alt="">
            <section> <!-- Colocar Mais projetos na section -->
                <div class="Rigth">
                    <img src="Assets/Images/Icon/task.png" alt="">
                    <div class="Info">
                        <h4>To-do list</h4>
                        <h4>10/10/1010</h4>
                    </div>

                    <div class="Controls">
                        <button>Github</button>
                        <button>Baixar</button>
                    </div>
                </div>

                <div class="Rigth">
                    <img src="Assets/Images/Icon/play.png" alt="">
                    <div class="Info">
                        <h4>To-do list</h4>
                        <h4>10/10/1010</h4>
                    </div>

                    <div class="Controls">
                        <button>Github</button>
                        <button>Baixar</button>
                    </div>
                </div>
            </section>
        </div>

        <!-- Colocar mais cards de projetos na section -->
    </div>
    `

    PrintResSobre.innerHTML = ''
    PrintResSobre.innerHTML = Card

    if (innerWidth <= 900) {
        IndicatoSessionSobre.style.left = "250px"
        return
    }

    IndicatoSessionSobre.style.left = "650px"
}

BtnCurriculoSobre.onclick = () => {
    CreateIframePdf(LinkPdf, PrintResSobre)
    if (innerWidth <= 900) {
        IndicatoSessionSobre.style.left = "105px"
        return
    }
    IndicatoSessionSobre.style.left = "307px"
}
