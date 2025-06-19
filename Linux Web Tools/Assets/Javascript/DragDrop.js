const container = document.getElementById('InsertTools')
const allDraggables = Array.from(document.getElementsByClassName('draggable'))

const gridSize = 70
let [draggedElement, shadowIndicator] = [null, null]
let [offsetX, offsetY] = [0, 0]

// Recupera posições salvas
function loadPositions() {
    const saved = localStorage.getItem('iconPositions')

    if (!saved) return

    const positions = JSON.parse(saved)

    allDraggables.forEach((elem, index) => {
        if (positions[index]) {
            elem.style.left = positions[index].left
            elem.style.top = positions[index].top
        }
    })
}

// Salva posições no localStorage
function savePositions() {
    const positions = allDraggables.map(elem => ({
        left: elem.style.left,
        top: elem.style.top
    }))

    localStorage.setItem('iconPositions', JSON.stringify(positions))
}

// Cria sombra de destino
function createShadow() {
    if (!shadowIndicator) {
        shadowIndicator = document.createElement('div')
        shadowIndicator.style.position = 'absolute'
        shadowIndicator.style.width = `${gridSize}px`
        shadowIndicator.style.height = `${gridSize}px`
        shadowIndicator.style.background = 'rgba(0,255,255,0.15)'
        shadowIndicator.style.border = '1px solid cyan'
        shadowIndicator.style.pointerEvents = 'none'

        container.appendChild(shadowIndicator)
    }
}

// Verifica se posição já está ocupada
function isOccupied(x, y, exclude) {
    for (let elem of allDraggables) {
        if (elem === exclude) continue

        let elemLeft = parseFloat(elem.style.left) || 0;

        let elemTop = parseFloat(elem.style.top) || 0

        if (elemLeft === x && elemTop === y) return true
    }
    return false
}

// Atualiza sombra
function updateShadow(x, y) {
    const snappedLeft = Math.round(x / gridSize) * gridSize
    const snappedTop = Math.round(y / gridSize) * gridSize

    let posX = snappedLeft
    let posY = snappedTop

    if (isOccupied(posX, posY, draggedElement)) {
        const maxDistance = Math.max(container.clientWidth, container.clientHeight)
        let found = false

        for (let dist = gridSize; dist < maxDistance; dist += gridSize) {
            for (let dx = -dist; dx <= dist; dx += gridSize) {
                for (let dy = -dist; dy <= dist; dy += gridSize) {
                    if (Math.abs(dx) !== dist && Math.abs(dy) !== dist) continue

                    let newX = snappedLeft + dx
                    let newY = snappedTop + dy

                    if (newX < 0 || newY < 0 || newX > container.clientWidth - gridSize || newY > container.clientHeight - gridSize) continue

                    if (!isOccupied(newX, newY, draggedElement)) {
                        posX = newX
                        posY = newY
                        found = true
                        break
                    }
                }
                if (found) break
            }

            if (found) break
        }
    }

    shadowIndicator.style.left = `${posX}px`
    shadowIndicator.style.top = `${posY}px`
}

// Posiciona no grid, evitando sobreposição
function snapToGridAndAvoidOverlap(element) {
    let left = parseFloat(element.style.left) || 0
    let top = parseFloat(element.style.top) || 0

    let snappedLeft = Math.round(left / gridSize) * gridSize
    let snappedTop = Math.round(top / gridSize) * gridSize

    if (!isOccupied(snappedLeft, snappedTop, element)) {
        element.style.left = `${snappedLeft}px`
        element.style.top =  `${snappedTop}px`
        return
    }

    const maxDistance = Math.max(container.clientWidth, container.clientHeight)

    for (let dist = gridSize; dist < maxDistance; dist += gridSize) {
        for (let dx = -dist; dx <= dist; dx += gridSize) {
            for (let dy = -dist; dy <= dist; dy += gridSize) {
                if (Math.abs(dx) !== dist && Math.abs(dy) !== dist) continue

                let newX = snappedLeft + dx
                let newY = snappedTop + dy

                if (newX < 0 || newY < 0 || newX > container.clientWidth - gridSize || newY > container.clientHeight - gridSize) continue

                if (!isOccupied(newX, newY, element)) {
                    element.style.left = `${newX}px`
                    element.style.top = `${newY}px`
                    return
                }
            }
        }
    }

    console.warn('Sem espaço livre!')
}

// Posiciona os ícones inicialmente
function setInitialPositions() {
    const cols = Math.floor(container.clientWidth / gridSize)

    allDraggables.forEach((elem, index) => {
        let left = (index % cols) * gridSize
        let top = Math.floor(index / cols) * gridSize

        elem.style.left = `${left}px`
        elem.style.top = `${top}px`
    })
}

// Eventos de drag
allDraggables.forEach(elem => {
    elem.addEventListener('mousedown', (e) => {
        draggedElement = elem

        offsetX = e.clientX - elem.getBoundingClientRect().left
        offsetY = e.clientY - elem.getBoundingClientRect().top
        elem.style.zIndex = '1000'

        createShadow()
    })
})

document.addEventListener('mousemove', (e) => {
    if (draggedElement) {
        document.querySelectorAll("#selectionBox").forEach(BoxSelect => {BoxSelect.remove()})

        e.stopImmediatePropagation()
        let x = e.clientX - container.getBoundingClientRect().left - offsetX
        let y = e.clientY - container.getBoundingClientRect().top - offsetY

        draggedElement.style.left = `${x}px`
        draggedElement.style.top = `${y}px`

        updateShadow(x, y)
    }
})

document.addEventListener('mouseup', () => {
    if (draggedElement) {
        snapToGridAndAvoidOverlap(draggedElement)
        draggedElement.style.zIndex = '0'

        if (shadowIndicator) {
            container.removeChild(shadowIndicator)
            shadowIndicator = null
        }
        draggedElement = null
        savePositions() // Salva sempre que soltar
    }
})

// Ao carregar a página
window.addEventListener('load', () => {
    setInitialPositions()
    loadPositions()
})