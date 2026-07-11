const prompt = require('prompt-sync')();

console.log("Calculadora de Propinas: \n");

const montoCuenta = parseFloat(prompt("Ingrese el monto de la cuenta: $"));

if (isNaN(montoCuenta) || montoCuenta <= 0) {
    console.log("Por favor, ingrese un monto válido mayor a 0.");
} else {
    const propina10 = montoCuenta * 0.10;
    const propina15 = montoCuenta * 0.15;
    const propina20 = montoCuenta * 0.20;

    console.log(`\nMonto de la cuenta: $${montoCuenta.toFixed(2)}`);
    console.log(`Propina del 10%: $${propina10.toFixed(2)}`);
    console.log(`Propina del 15%: $${propina15.toFixed(2)}`);
    console.log(`Propina del 20%: $${propina20.toFixed(2)}`);
}