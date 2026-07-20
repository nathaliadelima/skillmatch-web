async function carregarVagas() {
  try {
    const resposta = await fetch("./assets/dados/vagas.json");

    if (!resposta.ok) {
      throw new Error("Erro ao carregar as vagas.");
    }

    const vagas = await resposta.json();

    return vagas;
  } catch (erro) {

    console.error(erro);

    document.querySelector("#lista-vagas").innerHTML = `
        <p aria-live="assertive">
            Erro ao carregar as vagas.
        </p>
    `;

    return [];

}
}

export { carregarVagas };
