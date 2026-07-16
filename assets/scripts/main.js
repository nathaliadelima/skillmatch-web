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

const formulario = document.querySelector("#form-candidato")

formulario.addEventListener("submit", function (event) {

    event.preventDefault()

    const nome = document.querySelector("#nome").value.trim()

    const area = document.querySelector("#area").value

    const habilidades = document
        .querySelector("#habilidades")
        .value
        .split(",")
        .map(item => item.trim().toLowerCase())
        .filter(item => item !== "")

    const experienciaMeses = Number(
        document.querySelector("#experiencia").value
    )

    if (
        nome === "" ||
        area === "" ||
        habilidades.length === 0
    ) {
        alert("Preencha todos os campos obrigatórios.")
        return
    }

    const candidato = {
        nome,
        area,
        habilidades,
        experienciaMeses
    }

    localStorage.setItem(
    "candidato",
    JSON.stringify(candidato)
)

    const analise = analisarVagas(candidato, vagas);

    const recomendacoes = gerarRecomendacao(analise.resultados);

    mostrarResultados(analise.resultados);

    mostrarMelhorVaga(analise.melhorVaga);

    mostrarRecomendacao(recomendacoes);

})

let vagas = []

carregarVagas().then(resultado => {

    vagas = resultado

})

const candidatoSalvo =
    localStorage.getItem("candidato")

if (candidatoSalvo) {

    preencherFormulario(
        JSON.parse(candidatoSalvo)
    )

}