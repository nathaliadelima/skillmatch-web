function analisarVagas(candidato, vagas) {
  const resultados = [];

  let melhorVaga = null;

  let maiorCompatibilidade = 0;

  vagas.forEach((vaga) => {
    const habilidadesEncontradas = vaga.requisitos.filter((requisito) =>
      candidato.habilidades.includes(requisito.toLowerCase()),
    );

    const habilidadesFaltantes = vaga.requisitos.filter(
      (requisito) => !candidato.habilidades.includes(requisito.toLowerCase()),
    );

    const compatibilidade = Math.round(
      (habilidadesEncontradas.length / vaga.requisitos.length) * 100,
    );

    const resultado = {
      empresa: vaga.empresa,

      cargo: vaga.cargo,

      compatibilidade,

      habilidadesEncontradas,

      habilidadesFaltantes,
    };

    resultados.push(resultado);

    if (compatibilidade > maiorCompatibilidade) {
      maiorCompatibilidade = compatibilidade;

      melhorVaga = resultado;
    }
  });

  return {
    resultados,

    melhorVaga,
  };
}

function gerarRecomendacao(resultados) {
  const recomendacoes = [];

  const habilidadesAdicionadas = [];

  const descricaoHabilidades = {
    html: "Estrutura páginas utilizando HTML semântico e boas práticas de acessibilidade.",

    css: "Cria interfaces modernas e responsivas utilizando Flexbox, Grid e animações.",

    javascript:
      "Desenvolve funcionalidades dinâmicas e interatividade utilizando JavaScript.",

    git: "Aprenda versionamento de código com commits, branches e merge de alterações.",

    github:
      "Hospede projetos e colabore com outros desenvolvedores utilizando GitHub.",

    flexbox:
      "Organiza elementos da página de forma responsiva utilizando Flexbox.",

    grid: "Cria layouts modernos utilizando CSS Grid.",

    react: "Biblioteca JavaScript para construção de interfaces modernas.",

    api: "Aprenda a consumir APIs utilizando Fetch e trabalhar com dados externos.",

    localstorage: "Armazene informações do usuário diretamente no navegador.",
  };

  resultados.forEach((resultado) => {
    resultado.habilidadesFaltantes.forEach((habilidade) => {
      const chave = habilidade.toLowerCase();

      if (!habilidadesAdicionadas.includes(chave)) {
        habilidadesAdicionadas.push(chave);

        recomendacoes.push({
          habilidade,

          descricao:
            descricaoHabilidades[chave] ||
            "Competência importante para aumentar sua compatibilidade com mais vagas.",
        });
      }
    });
  });

  return recomendacoes;
}

export { analisarVagas, gerarRecomendacao };
