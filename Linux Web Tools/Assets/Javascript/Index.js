
// Ativar e desativar a tela cheia de elemento HTML ou a janela
function ToggleFullscreen(element = document.documentElement) {
    if (document.fullscreenElement === element) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }else {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
}

addEventListener('keydown', (e) => {
    if ((e.altKey && e.ctrlKey) && e.keyCode == 70) ToggleFullscreen(document.documentElement)
})