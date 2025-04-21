const LiHome = document.getElementById('LiHome')
const LiProjetos = document.getElementById('LiProjetos')
const LiSobre = document.getElementById('LiSobre')
const IndicatoSession = document.getElementById('IndicatoSession')

const Projetos = document.getElementById("Projetos")
// const Sobre = document.getElementById("Sobre")

let InitialIndicator = 32

function OpenSession(position) {
    switch (position) {
        case 32:
            Projetos.style.height = '0px'
            // Sobre.style.height = '0px'
            break
        case 130:
            Projetos.style.height = 'calc(100vh + 98%)'
            break
        /*case 230:
            Sobre.style.height = 'calc(100vh + 98%)'
            break*/
    }
}

function setIndicatorEvents(element, position) {
    element.onmouseover = () => {
        IndicatoSession.style.left = `${position}px`
    }
    element.onmouseleave = () => {
        IndicatoSession.style.left = `${InitialIndicator}px`
    }
    element.onclick = () => {
        InitialIndicator = position
        IndicatoSession.style.left = `${InitialIndicator}px`
        OpenSession(position)
    }
}

setIndicatorEvents(LiHome, 32, "Home")
setIndicatorEvents(LiProjetos, 130, "Projetos")
setIndicatorEvents(LiSobre, 230, "Sobre")
