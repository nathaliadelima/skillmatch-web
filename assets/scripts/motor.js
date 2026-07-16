function analisarVagas(candidato, vagas) {

    const resultados = []

    let melhorVaga = null

    let maiorCompatibilidade = 0

    vagas.forEach(vaga => {

        const habilidadesEncontradas = vaga.requisitos.filter(requisito =>
            candidato.habilidades.includes(requisito.toLowerCase())
        )

        const habilidadesFaltantes = vaga.requisitos.filter(requisito =>
            !candidato.habilidades.includes(requisito.toLowerCase())
        )

        const compatibilidade = Math.round(
            (habilidadesEncontradas.length / vaga.requisitos.length) * 100
        )

        const resultado = {

            empresa: vaga.empresa,

            cargo: vaga.cargo,

            compatibilidade,

            habilidadesEncontradas,

            habilidadesFaltantes

        }

        resultados.push(resultado)

        if (compatibilidade > maiorCompatibilidade) {

            maiorCompatibilidade = compatibilidade

            melhorVaga = resultado

        }

    })

    return {

        resultados,

        melhorVaga

    }

}

function gerarRecomendacao(resultados) {

    const habilidades = []

    resultados.forEach(resultado => {

        resultado.habilidadesFaltantes.forEach(habilidade => {

            if (!habilidades.includes(habilidade)) {

                habilidades.push(habilidade)

            }

        })

    })

    return habilidades

}

export {
    analisarVagas,
    gerarRecomendacao
}