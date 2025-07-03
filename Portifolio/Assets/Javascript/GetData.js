const GetInfoEcommerce = async (ListaEcommerce) => {
    try {
        const Url = await fetch("../Private/Page.json")

        if (!Url.ok) {
            console.log("Não foi possível encontrar a data Page.json")
            return
        }

        const Response = await Url.json()

        ListaEcommerce.push(...Response.Ecommerce.Card)

    } catch (e) {
        console.log('Erro na API da E-commerce: ', e)
    }
}

export { GetInfoEcommerce }
