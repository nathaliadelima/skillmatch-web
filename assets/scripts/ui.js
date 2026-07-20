function mostrarResultados(resultados) {
  const lista = document.querySelector("#lista-vagas");

  lista.innerHTML = "";

  resultados.forEach((resultado) => {
    const card = document.createElement("div");

    card.classList.add("card-vaga");

    card.innerHTML = `
            <h3>${resultado.cargo}</h3>

            <p><strong>Empresa:</strong> ${resultado.empresa}</p>

            <div class="barra">

    <div
        class="barra-preenchimento"
        style="width: ${resultado.compatibilidade}%"
    ></div>

    </div>

    <p class="texto-compatibilidade">

    ${resultado.compatibilidade}% de compatibilidade

    </p>

            <p>
                <strong>Encontradas:</strong>
                ${
                  resultado.habilidadesEncontradas.length > 0
                    ? resultado.habilidadesEncontradas.join(", ")
                    : "Nenhuma"
                }
            </p>

            <p>
                <strong>Faltantes:</strong>
                ${
                  resultado.habilidadesFaltantes.length > 0
                    ? resultado.habilidadesFaltantes.join(", ")
                    : "Nenhuma"
                }
            </p>
        `;

    lista.appendChild(card);
  });
}

function mostrarMelhorVaga(melhorVaga) {
  const secao = document.querySelector("#melhor-vaga");

  if (!melhorVaga) {
    secao.innerHTML = `
            <h2>Melhor vaga</h2>
            <p>Nenhuma vaga encontrada.</p>
        `;

    return;
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

    `;
}

function preencherFormulario(candidato) {
  document.querySelector("#nome").value = candidato.nome;

  document.querySelector("#area").value = candidato.area;

  document.querySelector("#habilidades").value =
    candidato.habilidades.join(", ");

  document.querySelector("#experiencia").value = candidato.experienciaMeses;
}

function mostrarRecomendacao(recomendacoes) {
  const secao = document.querySelector("#recomendacao");

  if (recomendacoes.length === 0) {
    secao.innerHTML = `
            <h2>Recomendação de estudos</h2>

            <p>
                🎉 Parabéns! Você já possui todas as habilidades exigidas pelas vagas analisadas.
            </p>
        `;

    return;
  }

  const lista = recomendacoes
    .map((recomendacao) => {
      return `

                <div class="card-estudo">

                    <h4>${recomendacao.habilidade}</h4>

                    <p>${recomendacao.descricao}</p>

                </div>

            `;
    })
    .join("");

  secao.innerHTML = `

        <h2>Recomendação de estudos</h2>

        <p>
            Estas competências podem aumentar bastante sua compatibilidade
            com outras oportunidades:
        </p>

        <div class="lista-estudos">

            ${lista}

        </div>

    `;
}

export {
  mostrarResultados,
  mostrarMelhorVaga,
  mostrarRecomendacao,
  preencherFormulario,
};
