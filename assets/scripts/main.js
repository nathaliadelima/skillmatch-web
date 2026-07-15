import "./motor.js";
import "./ui.js";
import "./dados.js";
import { carregarVagas } from "./dados.js"

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

    console.log(candidato)

})

carregarVagas()