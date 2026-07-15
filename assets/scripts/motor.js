function analisarVagas(candidato, vagas) {

    const resultados = []

    vagas.forEach(vaga => {

        const habilidadesEncontradas = vaga.requisitos.filter(requisito =>
            candidato.habilidades.includes(requisito.toLowerCase())
        )

        const habilidadesFaltantes = vaga.requisitos.filter(requisito =>
            !candidato.habilidades.includes(requisito.toLowerCase())
        )

        const compatibilidade =
            (habilidadesEncontradas.length / vaga.requisitos.length) * 100

        resultados.push({

            empresa: vaga.empresa,

            cargo: vaga.cargo,

            compatibilidade: compatibilidade.toFixed(0),

            habilidadesEncontradas,

            habilidadesFaltantes

        })

    })

    return resultados

}

export { analisarVagas }