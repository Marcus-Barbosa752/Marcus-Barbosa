const CreateIframePdf = (Link, Saida) => {
    const Iframe = `<embed src="${Link}" type="application/pdf"></embed>`

    Saida.innerHTML = ''
    Saida.innerHTML = Iframe
}

export { CreateIframePdf }
