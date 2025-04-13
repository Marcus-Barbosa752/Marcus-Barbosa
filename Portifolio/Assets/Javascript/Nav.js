const LiHome = document.getElementById('LiHome')
const LiProjetos = document.getElementById('LiProjetos')
const LiSobre = document.getElementById('LiSobre')
const IndicatoSession = document.getElementById('IndicatoSession')

let InitialIndicator = 32

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
    }
}

setIndicatorEvents(LiHome, 32)
setIndicatorEvents(LiProjetos, 130)
setIndicatorEvents(LiSobre, 230)
