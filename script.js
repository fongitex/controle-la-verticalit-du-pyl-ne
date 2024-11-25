// script.js
function calculate() {
    const pyloneType = document.getElementById("pyloneType").value;
    const height = parseFloat(document.getElementById("height").value);
    const measuredValue = parseFloat(document.getElementById("measuredValue").value);
    const verificationType = document.getElementById("verificationType").value;
    const depointageValue = parseFloat(document.getElementById("depointageValue").value);

    let resultText = "";
    let resultColor = "";
    let symbol = "";
    let isConforme = false;

    if (verificationType === "norme") {
        const ecartTheorique = pyloneType === "autostable" ? height / 1000 : height / 2000;
        isConforme = measuredValue <= ecartTheorique * 1000;

        resultText = `Hauteur (H) : ${height.toFixed(2)} m<br>
                      Valeur Mesurée d'Inclinaison (D) : ${measuredValue.toFixed(2)} mm<br>
                      Ecart Théorique (Norme ${pyloneType === "autostable" ? "1/1000" : "1/2000"}) = ${(ecartTheorique * 1000).toFixed(2)} mm<br>
                      Résultat : Le pylône est ${isConforme ? "conforme" : "non conforme"} à la norme.`;

    } else if (verificationType === "depointage") {
        const limiteInclinaison = Math.tan(depointageValue * Math.PI / 180) * height;
        isConforme = measuredValue <= limiteInclinaison * 1000;

        resultText = `Hauteur (H) : ${height.toFixed(2)} m<br>
                      Valeur Mesurée d'Inclinaison (D) : ${measuredValue.toFixed(2)} mm<br>
                      Limite de Dépointage Calculée = ${(limiteInclinaison * 1000).toFixed(2)} mm<br>
                      Résultat : La valeur mesurée ${isConforme ? "respecte" : "ne respecte pas"} l'exigence de dépointage.`;
    }

    resultColor = isConforme ? "green" : "red";
    symbol = isConforme ? "✔️" : "✖️";

    document.getElementById("results").innerHTML = `${resultText}<br>Statut : <span style="color:${resultColor}; font-size:1.2em;">${symbol}</span>`;
}

document.getElementById("verificationType").addEventListener("change", function() {
    const isDepointage = this.value === "depointage";
    document.getElementById("depointageLabel").style.display = isDepointage ? "block" : "none";
    document.getElementById("depointageValue").style.display = isDepointage ? "block" : "none";
});
