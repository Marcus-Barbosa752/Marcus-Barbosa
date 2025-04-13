async function CarregarProdutos(List, GerarListaDeProdutos) {
    try {
        const response = await fetch('Assets/Private/data.json')
        if (!response.ok) throw new Error("Erro ao fazer a busca dos produtos no json")

        const data = await response.json()
        List.length = 0

        List.push(...data)

        if (List.length === 0) {
            console.log('A lista está vazia!')
        }else {
            GerarListaDeProdutos()
        }

    }catch (e) {
        console.log("Erro ao carregar os produtos!:\n>>", e.message)
    }
}

export { CarregarProdutos }