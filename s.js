const words = [
    {word: "Apricity", meaning: "The warmth of the sun in winter", origin: "Latin", example: "She basked in the apricity of the early morning sun."},
    {word: "Susurrus", meaning: "A whispering or rustling sound", origin: "Latin", example: "The susurrus of leaves filled the air."},
    {word: "Clinomania", meaning: "An excessive desire to stay in bed", origin: "Greek", example: "His clinomania was stronger on cold winter mornings."}
    ,{word: "1", meaning: "An excessive desire to stay in bed", origin: "Greek", example: "His 1 was stronger on cold winter mornings."}
    ,{word: "2", meaning: "An excessive desire to stay in bed", origin: "Greek", example: "His 2 was stronger on cold winter mornings."}
];

function createWordCards() {
    const container = document.getElementById("word-container");
    const shuffledWords = [...words].sort(() => Math.random() - 0.5).slice(0, 3);
    shuffledWords.forEach((wordData) => {
        const card = document.createElement("div");
        card.classList.add("word-card");
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <p>Tap to reveal</p>
                </div>
                <div class="card-back">
                    <h2>${wordData.word}</h2>
                    <p>${wordData.meaning}</p>
                    <p><strong>Origin:</strong> ${wordData.origin}</p>
                    <p><em>Example:</em> ${wordData.example}</p>
                </div>
            </div>
        `;
        
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
            card.classList.add("disabled");
        });
        
        container.appendChild(card);
    });
}

createWordCards();