async function carregarVagas() {

    try {

        const resposta = await fetch("./assets/dados/vagas.json")

        if (!resposta.ok) {
            throw new Error("Erro ao carregar as vagas.")
        }

        const vagas = await resposta.json()

        console.log("Vagas carregadas:")

        console.log(vagas)

        return vagas

    } catch (erro) {

        console.error(erro)

        return []

    }

}

export { carregarVagas }