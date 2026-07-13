class Vaga {
    constructor(id, empresa, cargo, requisitos, salario, modalidade) {
        this.id = id
        this.empresa = empresa
        this.cargo = cargo
        this.requisitos = requisitos
        this.salario = salario
        this.modalidade = modalidade
    }

    calcularCompatibilidade(habilidadesCandidato) {
        const habilidadesEncontradas = this.requisitos.filter((requisito) =>
            habilidadesCandidato.includes(requisito)
        )

        const habilidadesFaltantes = this.requisitos.filter((requisito) =>
            !habilidadesCandidato.includes(requisito)
        )

        const compatibilidade =
            (habilidadesEncontradas.length / this.requisitos.length) * 100

        return {
            habilidadesEncontradas,
            habilidadesFaltantes,
            compatibilidade,
        }
    }
}

class VagaFrontEnd extends Vaga {
    constructor(
        id,
        empresa,
        cargo,
        requisitos,
        salario,
        modalidade,
        nivel
    ) {
        super(id, empresa, cargo, requisitos, salario, modalidade)

        this.nivel = nivel
    }

    mostrarNivel() {
        return this.nivel
    }
}

// ============================
// CLOSURE
// ============================

function criarContadorAnalises() {
    let total = 0

    return function () {
        total++
        return total
    }
}

const contarAnalise = criarContadorAnalises()

// ============================
// CALLBACK
// ============================

function finalizarAnalise(candidato, callback) {
    return callback(candidato)
}

function mensagemFinal(candidato) {
    return `${candidato.nome}, revise as habilidades faltantes para aumentar sua compatibilidade.`
}

// ============================
// CLASSIFICAÇÃO
// ============================

function classificarCompatibilidade(compatibilidade) {
    if (compatibilidade >= 80) {
        return "Alta compatibilidade"
    }

    if (compatibilidade >= 50) {
        return "Média compatibilidade"
    }

    return "Baixa compatibilidade"
}

// ============================
// ANALISAR UMA VAGA
// ============================

function analisarVaga(candidato, vaga) {
    const numeroAnalise = contarAnalise()

    const resultado = vaga.calcularCompatibilidade(candidato.habilidades)

    return {
        numeroAnalise,

        empresa: vaga.empresa,

        cargo: vaga.cargo,

        salario: vaga.salario,

        modalidade: vaga.modalidade,

        compatibilidade: resultado.compatibilidade,

        classificacao: classificarCompatibilidade(
            resultado.compatibilidade
        ),

        habilidadesEncontradas: resultado.habilidadesEncontradas,

        habilidadesFaltantes: resultado.habilidadesFaltantes,
    }
}

// ============================
// ANALISAR TODAS AS VAGAS
// ============================

function analisarVagas(candidato, vagas) {

    const analises = vagas.map((vaga) => analisarVaga(candidato, vaga))

    const melhorVaga = analises.reduce((melhor, vagaAtual) => {

        if (!melhor) {
            return vagaAtual
        }

        if (vagaAtual.compatibilidade > melhor.compatibilidade) {
            return vagaAtual
        }

        return melhor

    }, null)

    const todasTemSalario = vagas.every((vaga) => vaga.salario > 0)

    return {
        analises,
        melhorVaga,
        todasTemSalario
    }
}

// ============================
// RECOMENDAÇÃO DE ESTUDO
// ============================

function gerarRecomendacaoEstudo(candidato, vagas) {

    const habilidadesFaltantes = vagas.flatMap((vaga) =>

        vaga.requisitos.filter((requisito) =>

            !candidato.habilidades.includes(requisito)

        )

    )

    const habilidadesUnicas = [...new Set(habilidadesFaltantes)]

    if (habilidadesUnicas.length === 0) {
        return "Parabéns! Você já possui todas as habilidades das vagas analisadas."
    }

    return `Priorize estudar: ${habilidadesUnicas.join(", ")}.`
}

// ============================
// EXPORTS
// ============================

export {

    Vaga,

    VagaFrontEnd,

    analisarVaga,

    analisarVagas,

    gerarRecomendacaoEstudo,

    finalizarAnalise,

    mensagemFinal

}