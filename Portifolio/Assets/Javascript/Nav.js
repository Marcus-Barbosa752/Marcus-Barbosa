const LiHome = document.getElementById('LiHome')
const LiProjetos = document.getElementById('LiProjetos')
const LiSobre = document.getElementById('LiSobre')
const IndicatoSession = document.getElementById('IndicatoSession')

const Projetos = document.getElementById("Projetos")

let InitialIndicator = 32

function setIndicatorEvents(element, position, section) {
    element.onmouseover = () => {
        IndicatoSession.style.left = `${position}px`
    }
    element.onmouseleave = () => {
        IndicatoSession.style.left = `${InitialIndicator}px`
    }
    element.onclick = () => {
        InitialIndicator = position
        IndicatoSession.style.left = `${InitialIndicator}px`

        if (section == "Home") {
            Projetos.style.height = '0px'
            return
        }

        if (section == "Projetos") {
            Projetos.style.height = 'calc(100vh + 98%)'
            return
        }
    }
}

setIndicatorEvents(LiHome, 32, "Home")
setIndicatorEvents(LiProjetos, 130, "Projetos")
setIndicatorEvents(LiSobre, 230, "Sobre")
