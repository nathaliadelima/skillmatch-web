import { carregarVagas } from "./dados.js";
import {
    analisarVagas,
    gerarRecomendacao
} from "./motor.js";

import {
    mostrarResultados,
    mostrarMelhorVaga,
    mostrarRecomendacao,
    preencherFormulario
} from "./ui.js";

const formulario = document.querySelector("#form-candidato");

let vagas = [];

// Carrega as vagas ao iniciar a aplicação
async function iniciar() {

    vagas = await carregarVagas();

    if (vagas.length === 0) {
    document.querySelector("#lista-vagas").innerHTML = `
        <p aria-live="polite">
            Nenhuma vaga encontrada.
        </p>
    `;
    }

    const status = document.querySelector("#status-vagas");

    status?.remove();

    const candidatoSalvo = localStorage.getItem("candidato");

    if (candidatoSalvo) {

        preencherFormulario(
            JSON.parse(candidatoSalvo)
        );

    }

}

iniciar();

// Envio do formulário
formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const nome = document
        .querySelector("#nome")
        .value
        .trim();

    const area = document
        .querySelector("#area")
        .value;

    const habilidades = document
        .querySelector("#habilidades")
        .value
        .split(",")
        .map(item => item.trim().toLowerCase())
        .filter(item => item !== "");

    const experienciaMeses = Number(
        document.querySelector("#experiencia").value
    );

    if (
        nome === "" ||
        area === "" ||
        habilidades.length === 0
    ) {

        alert("Preencha todos os campos obrigatórios.");
        return;

    }

    const candidato = {

        nome,
        area,
        habilidades,
        experienciaMeses

    };

    // Salva os dados do candidato
    localStorage.setItem(
        "candidato",
        JSON.stringify(candidato)
    );

    // Analisa as vagas
    const analise = analisarVagas(
        candidato,
        vagas
    );

    // Gera recomendações
    const recomendacoes = gerarRecomendacao(
        analise.resultados
    );

    // Atualiza a interface
    mostrarResultados(
        analise.resultados
    );

    mostrarMelhorVaga(
        analise.melhorVaga
    );

    mostrarRecomendacao(
        recomendacoes
    );

    // Scroll automático até o resultado
    document
        .querySelector("#melhor-vaga")
        .scrollIntoView({

            behavior: "smooth"

        });

});