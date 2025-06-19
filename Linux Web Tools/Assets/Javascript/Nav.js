const BtnToggleFullScreenArchive = document.getElementById('BtnToggleFullScreenArchive')
const BtnArchive = document.querySelectorAll('#BtnArchive')
const BtnCloseArchive = document.getElementById('BtnCloseArchive')
const BtnOpenArchive = document.getElementById('BtnOpenArchive')
const BtnMinimizarArchive = document.getElementById("BtnMinimizarArchive")

const Archives = document.getElementById("Archives")
const InsertToolsTaskBar = document.getElementById('InsertToolsTaskBar')
const AcoesArchive = document.getElementById('AcoesArchive')

const Session = [
    document.getElementById('Favoritos'),
    document.getElementById('PastaPessoal'),
    document.getElementById('Documentos'),
    document.getElementById('Downloads'),
    document.getElementById('Pdf'),
    document.getElementById('Doc'),
    document.getElementById('Audio')
]

// Variável para controlar se está em fullscreen
let isFullScreenArchive = false

// Função para ajuste de tamanho do Archives
const adjustArchiveSize = () => {
    const Archives = document.getElementById("Archives")

    if (window.innerHeight >= 768) {
        Archives.style.top = '362px'
        Archives.style.height = '95vh'
    }else {
        Archives.style.top = '300px'
        Archives.style.height = '94vh'
    }
}

// Função debounce para evitar chamadas excessivas durante resize
let resizeTimeout

const debounceAdjustArchiveSize = () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
        adjustArchiveSize()
    }, 150)
}

// Ícone Archive na TaskBar
BtnOpenArchive.onclick = () => {
    document.getElementById('Archives').style.display = 'block'

    const Html = `
    <div class="CardToolsTaskBar" id="IconArchiveTaskBar">
        <img src="Assets/Images/Icon/archive.png" alt="">
    </div>
    `

    InsertToolsTaskBar.innerHTML += Html
}

// Alternar Fullscreen Archive
BtnToggleFullScreenArchive.onclick = () => {
    const ItagExpandArchive = document.getElementById('ItagExpandArchive')

    Archives.style.transition = '.3s ease'

    if (ItagExpandArchive.classList.contains('fa-expand')) { // Ativar Fullscreen
        ItagExpandArchive.classList.remove('fa-expand')
        ItagExpandArchive.classList.add('fa-compress')

        Archives.style.width = '100vw'
        Archives.style.borderRadius = '0px'
        AcoesArchive.style.gridTemplateColumns = '15% 1fr'

        adjustArchiveSize()
        window.addEventListener('resize', debounceAdjustArchiveSize)
        isFullScreenArchive = true

    }else { // Sair do Fullscreen
        ItagExpandArchive.classList.remove('fa-compress')
        ItagExpandArchive.classList.add('fa-expand')

        Archives.style.top = '50%'
        Archives.style.width = '70vw'
        Archives.style.height = '80vh'
        Archives.style.borderRadius = '10px'
        AcoesArchive.style.gridTemplateColumns = '20% 1fr'

        if (isFullScreenArchive) {
            window.removeEventListener('resize', debounceAdjustArchiveSize)
            isFullScreenArchive = false
        }
    }
}

// Botão Fechar Archive
BtnCloseArchive.onclick = () => {
    document.getElementById('Archives').style.display = 'none'

    const Icon = document.getElementById('IconArchiveTaskBar')
    if (Icon) Icon.remove()
}

// Botão de minimizar Archive
BtnMinimizarArchive.onclick = () => {
    const Icon = document.getElementById('IconArchiveTaskBar')

    if (Icon) {
        Archives.style.width = '0'
        Archives.style.height = '0'
        Archives.style.top = '100%'
        Archives.style.left = `${Icon.offsetHeight + 50}px`
        AcoesArchive.style.gridTemplateColumns = '20% 1fr'

        Icon.onclick = () => {
            if (Archives.style.width != '70vw') {
                Archives.style.top = '50%'
                Archives.style.left = '50%'
                Archives.style.width = '70vw'
                Archives.style.height = '80vh'
                Archives.style.borderRadius = '10px'
                AcoesArchive.style.gridTemplateColumns = '20% 1fr'
                return
            }

            Archives.style.width = '0'
            Archives.style.height = '0'
            Archives.style.top = '100%'
            Archives.style.left = `${Icon.offsetHeight + 50}px`
            AcoesArchive.style.gridTemplateColumns = '20% 1fr'
        }
    }
}

// Configurar sessões
Session.forEach(Sessao => Sessao.classList.add('Session'))

const OpenSession = (Index) => {
    Session.forEach((Sessao, i) => {
        if (i === Index) {
            Sessao.style.display = 'block'
            requestAnimationFrame(() => {
                Sessao.classList.add('Show')
            })
        }else {
            Sessao.classList.remove('Show')
            setTimeout(() => {
                Sessao.style.display = 'none'
            }, 500)
        }
    })
}

// Controle de botões de sessão
BtnArchive.forEach((BtnActive, Index) => {
    BtnActive.onclick = () => {
        BtnArchive.forEach(BtnDisable => BtnDisable.classList.remove('ActiveBtnArchive'))
        BtnActive.classList.add('ActiveBtnArchive')
        OpenSession(Index)
    }
})

document.addEventListener('mousedown', (e) => {
    e.preventDefault()

    if(3 === e.which) alert('right click!')
}, false)   