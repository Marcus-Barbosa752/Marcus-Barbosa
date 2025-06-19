const CardTools = document.querySelectorAll('#InsertTools .CardTools')

let startX, startY, selectionBox
let selectedCards = new Set()

document.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return

    // Detecta se o clique foi fora de qualquer .CardTools
    if (![...CardTools].some(card => card.contains(e.target))) {
        clearSelection()
    }

    startX = e.clientX
    startY = e.clientY

    selectionBox = document.createElement('div')
    selectionBox.setAttribute('id', 'selectionBox')
    selectionBox.style.position = 'absolute'
    selectionBox.style.border = '2px solid #2e6fdb'
    selectionBox.style.backgroundColor = 'rgba(46, 111, 219, 0.3)'
    selectionBox.style.left = `${startX}px`
    selectionBox.style.top = `${startY}px`
    selectionBox.style.pointerEvents = 'none'
    selectionBox.style.borderRadius = '10px'

    document.body.appendChild(selectionBox)

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
})

function onMouseMove(e) {
    const currentX = e.clientX
    const currentY = e.clientY

    const width = Math.abs(currentX - startX)
    const height = Math.abs(currentY - startY)

    selectionBox.style.width = `${width}px`
    selectionBox.style.height = `${height}px`
    selectionBox.style.left = `${Math.min(currentX, startX)}px`
    selectionBox.style.top = `${Math.min(currentY, startY)}px`

    const selectionRect = selectionBox.getBoundingClientRect()

    selectedCards.clear()

    CardTools.forEach(Card => {
        const cardRect = Card.getBoundingClientRect()

        const isInside =
            cardRect.left < selectionRect.right &&
            cardRect.right > selectionRect.left &&
            cardRect.top < selectionRect.bottom &&
            cardRect.bottom > selectionRect.top

        if (isInside) {
            Card.style.backgroundColor = 'rgba(255, 255, 255, 0.575)'
            selectedCards.add(Card)
        }else {
            Card.style.backgroundColor = ''
        }
    })
}

function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)

    // Mantém a seleção após soltar
    selectedCards.forEach(card => {
        card.style.backgroundColor = 'rgba(255, 0, 0, 0.57)'
    })

    if (selectionBox) {
        selectionBox.remove()
        selectionBox = null
    }
}

function clearSelection() {
    selectedCards.forEach(card => {
        card.style.backgroundColor = ''
    })
    selectedCards.clear()
}
