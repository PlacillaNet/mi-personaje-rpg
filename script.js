function tirarDados() {
    const resultado = Math.floor(Math.random() * 6) + 1;
    document.getElementById("resultado").innerText = `El dado ha salido: ${resultado}`;
}
// script.js
console.log("¡Hola! Mi personaje está listo.");
