// Importamos prompt-sync para poder recibir datos desde la consola
const prompt = require('prompt-sync')();

// Constante del IVA (15%)
const IVA = 0.15;

// Variable donde guardaremos el valor de la compra ingresado por el usuario
let valorCompra = parseFloat(prompt("Ingrese el valor de la compra: $"));

// Validamos que el valor ingresado sea correcto
if (isNaN(valorCompra) || valorCompra <= 0) {
    console.log("Ingrese un valor de compra válido mayor a 0.");
} else {

    // Calculamos el valor del IVA
    let valorIVA = valorCompra * IVA;

    // Calculamos el valor total sumando compra + IVA
    let valorTotal = valorCompra + valorIVA;

    // Mostramos los resultados en pantalla
    console.log("\n--- FACTURA ---");
    console.log(`Valor de la compra: $${valorCompra.toFixed(2)}`);
    console.log(`IVA (15%): $${valorIVA.toFixed(2)}`);
    console.log(`Total a pagar: $${valorTotal.toFixed(2)}`);
}