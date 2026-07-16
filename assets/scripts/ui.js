function mostrarResultados(resultados) {

    const lista = document.querySelector("#lista-vagas")

    lista.innerHTML = ""

    resultados.forEach(resultado => {

        const card = document.createElement("div")

        card.classList.add("card-vaga")

        card.innerHTML = `
            <h3>${resultado.cargo}</h3>

            <p><strong>Empresa:</strong> ${resultado.empresa}</p>

            <div class="compatibilidade">
            ${resultado.compatibilidade}% de compatibilidade
            </div>

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

function mostrarMelhorVaga(melhorVaga) {

    const secao = document.querySelector("#melhor-vaga")

    if (!melhorVaga) {

        secao.innerHTML = `
            <h2>Melhor vaga</h2>
            <p>Nenhuma vaga encontrada.</p>
        `

        return

    }

    secao.innerHTML = `

        <h2>Vaga mais compatível</h2>

        <div class="card-melhor-vaga">

            <h3>${melhorVaga.cargo}</h3>

            <p>
                <strong>Empresa:</strong>
                ${melhorVaga.empresa}
            </p>

            <p>
                <strong>Compatibilidade:</strong>
                ${melhorVaga.compatibilidade}%
            </p>

        </div>

    `

}

function preencherFormulario(candidato) {

    document.querySelector("#nome").value = candidato.nome

    document.querySelector("#area").value = candidato.area

    document.querySelector("#habilidades").value =
        candidato.habilidades.join(", ")

    document.querySelector("#experiencia").value =
        candidato.experienciaMeses

}

export {
    mostrarResultados,
    mostrarMelhorVaga,
    preencherFormulario
}