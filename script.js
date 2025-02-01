let timeoutId;
let lastSeries = [];
let isRunning = false;

document.getElementById('start').addEventListener('click', startGenerator);
document.getElementById('stop').addEventListener('click', stopGenerator);
document.getElementById('showLast').addEventListener('click', showLastSeries);

function startGenerator() {
    if (isRunning) return; // Evita múltiples ejecuciones
    isRunning = true;

    const quantity = parseInt(document.getElementById('quantity').value);
    const delay = parseInt(document.getElementById('delay').value);
    const displayTime = parseInt(document.getElementById('displayTime').value);
    const size = parseInt(document.getElementById('size').value);
    const pairs = parseInt(document.getElementById('pairs').value);
    const mode = document.getElementById('mode').value;

    const numbersDiv = document.getElementById('numbers');
    numbersDiv.innerHTML = ''; // Comienza en blanco
    lastSeries = [];

    let count = 0;

    function showNextNumber() {
        if (count >= quantity || !isRunning) {
            stopGenerator();
            return;
        }

        // Tiempo en blanco antes de mostrar el número
        timeoutId = setTimeout(() => {
            if (!isRunning) return; // Detener si se presionó Stop

            const randomNumbers = [];
            for (let i = 0; i < pairs; i++) {
                let randomNumber;
                if (mode === "decimal") {
                    randomNumber = Math.floor(Math.random() * 100);
                    randomNumber = String(randomNumber).padStart(2, '0'); // Formato de 2 dígitos
                } else if (mode === "binary6") {
                    randomNumber = formatBinary(generateBinary(6), 3); // Binario de 6 cifras, formato 3x2
                } else if (mode === "binary8") {
                    randomNumber = formatBinary(generateBinary(8), 4); // Binario de 8 cifras, formato 4x2
                }
                randomNumbers.push(randomNumber);
            }
            lastSeries.push(randomNumbers.join(' • ')); // Guardar la serie

            numbersDiv.innerHTML = randomNumbers.join('<br>'); // Mostrar números simultáneos con salto de línea
            numbersDiv.style.fontSize = `${size}px`;

            // Tiempo de visualización del número
            timeoutId = setTimeout(() => {
                numbersDiv.innerHTML = ''; // Vuelve a blanco después de mostrar el número

                // Tiempo en blanco antes del siguiente número
                timeoutId = setTimeout(() => {
                    count++;
                    showNextNumber(); // Repite el ciclo
                }, delay);
            }, displayTime);
        }, delay); // Tiempo en blanco inicial
    }

    showNextNumber(); // Inicia la secuencia
}

function generateBinary(length) {
    let binary = '';
    for (let i = 0; i < length; i++) {
        binary += Math.round(Math.random()); // Genera 0 o 1
    }
    return binary;
}

function formatBinary(binary, groupSize) {
    let formattedBinary = '';
    for (let i = 0; i < binary.length; i += groupSize) {
        formattedBinary += binary.slice(i, i + groupSize) + '<br>'; // Agrega salto de línea
    }
    return formattedBinary.trim(); // Elimina el último salto de línea
}

function stopGenerator() {
    isRunning = false;
    clearTimeout(timeoutId); // Detiene todos los timeouts
    document.getElementById('numbers').innerHTML = ''; // Limpia la pantalla
}

function showLastSeries() {
    alert(`Última serie:\n${lastSeries.join('\n')}`);
}
