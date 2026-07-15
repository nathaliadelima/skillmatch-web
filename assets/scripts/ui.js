function mostrarResultados(resultados) {

    const lista = document.querySelector("#lista-vagas")

    lista.innerHTML = ""

    resultados.forEach(resultado => {

        const card = document.createElement("div")

        card.classList.add("card-vaga")

        card.innerHTML = `
            <h3>${resultado.cargo}</h3>

            <p><strong>Empresa:</strong> ${resultado.empresa}</p>

            <p><strong>Compatibilidade:</strong> ${resultado.compatibilidade}%</p>

            <p>
                <strong>Encontradas:</strong>
                ${resultado.habilidadesEncontradas.join(", ")}
            </p>

            <p>
                <strong>Faltantes:</strong>
                ${resultado.habilidadesFaltantes.join(", ")}
            </p>
        `

        lista.appendChild(card)

    })

}

export { mostrarResultados }