import { GetInfoEcommerce } from './GetData.js'

const InsertProjectEcommerce = document.getElementById('InsertProjectEcommerce')

const ListaEcommerce = []
const REGEX_URL = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/

const ContainerSobre = (Img, Title, About, Link) => {
    const container = document.createElement('section')
    container.className = 'SobreProjetos'
    container.id = 'SobreProjetos'

    container.innerHTML = `
        <nav>
            <button id="BtnBack"><i class="fi fi-sr-home"></i>Voltar</button>

            <ul>
                <li id="LiVisitedAppEcommerce" data-link="${Link}">
                    <i class="fi fi-sr-globe"></i>Visitar
                </li>
                <li><i class="fi fi-sr-master-plan"></i>Projetar</li>
            </ul>
        </nav>

        <div class="InsertInfoProject" id="InsertInfoProject">
            <div class="Left">
                <div class="InsertImage">
                    <img src="${Img}" class="ImgBack">
                    <img src="${Img}">
                </div>
                <h4>${Title}</h4>
            </div>

            <div class="Right">${About}</div>
        </div>
    `

    container.querySelector('#BtnBack').onclick = () => container.remove()

    if (Link) {
        container.querySelector('#LiVisitedAppEcommerce').onclick = () => {
            window.open(Link, '_blank')
        }
    }

    document.body.appendChild(container)
}

const Ecommerce = async () => {
    await GetInfoEcommerce(ListaEcommerce)
    
    for (let i = 0; i < ListaEcommerce.length; i++) {
        const Card = `
        <div class="CardEcommerce">
            <img src="${ListaEcommerce[i].Img}">
            <h4>${ListaEcommerce[i].Title}</h4>
            <nav>
                <button class="BtnVisitarProjeto" data-index="${i}">
                    <i class="fi fi-sr-globe"></i> Visitar
                </button>
                <button class="BtnOpenSobreProjetos" data-index="${i}">
                    <i class="fi fi-sr-terms-info"></i> Sobre
                </button>
            </nav>
        </div>
        `
        InsertProjectEcommerce.innerHTML += Card
    }

    document.querySelectorAll('.BtnVisitarProjeto').forEach(btn => {
        const index = btn.getAttribute('data-index')

        btn.addEventListener('click', () => {
            const link = ListaEcommerce[index].Link

            if (!REGEX_URL.test(link)) {
                alert(`Não foi possivel abrir esse link [ ${link} ], url invalido!`)
                return
            }

            open(link, '_blank')
        })
    })

    document.querySelectorAll('.BtnOpenSobreProjetos').forEach(btn => {
        const index = btn.getAttribute('data-index')

        btn.addEventListener('click', () => {
            ContainerSobre(ListaEcommerce[index].Img, ListaEcommerce[index].Title, ListaEcommerce[index].Sobre, ListaEcommerce[index].Link)
        })
    })
}

Ecommerce()
