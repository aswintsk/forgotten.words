const words = [
    {word: "Apricity", meaning: "The warmth of the sun in winter", origin: "Latin", example: "She basked in the apricity of the early morning sun."},
    {word: "Susurrus", meaning: "A whispering or rustling sound", origin: "Latin", example: "The susurrus of leaves filled the air."},
    {word: "Clinomania", meaning: "An excessive desire to stay in bed", origin: "Greek", example: "His clinomania was stronger on cold winter mornings."},
    {word: "Lethologica", meaning: "The inability to remember a particular word", origin: "Greek", example: "He experienced lethologica during his speech and struggled to find the right term."},
    {word: "Strikhedonia", meaning: "The joy of saying 'to hell with it' and doing as one pleases", origin: "Greek", example: "She felt a rush of strikhedonia as she booked a spontaneous trip to the mountains."},
    {word: "Resfeber", meaning: "The restless race of a traveler's heart before a journey", origin: "Swedish", example: "His resfeber kept him awake the night before his big adventure."},
    {word: "Hodophile", meaning: "A lover of roads and travel", origin: "Greek", example: "As a true hodophile, he found joy in every journey he took."},
    {word: "Serein", meaning: "The fine, light rain that falls after sunset", origin: "French", example: "They walked through the serein, enjoying the cool evening air."},
    {word: "Quomodocunquize", meaning: "To make money in any way possible", origin: "Latin", example: "His quomodocunquizing ways ensured he always had enough to travel."},
    {word: "Nepenthe", meaning: "Something that makes you forget sorrow or pain", origin: "Greek", example: "Music was her nepenthe after a long, stressful day."},
    {word: "Drapetomania", meaning: "An intense urge to run away", origin: "Greek", example: "The feeling of drapetomania struck him every time life felt too routine."},
    {word: "Pluviophile", meaning: "A lover of rain", origin: "Latin", example: "As a true pluviophile, she found peace in the sound of raindrops on the window."},
    {word: "Velleity", meaning: "A wish or inclination not strong enough to act upon", origin: "Latin", example: "He had a velleity to learn the guitar but never actually started."},
    {word: "Brontide", meaning: "A low, rumbling sound like distant thunder", origin: "Greek", example: "The brontide in the distance signaled an approaching storm."},
    {word: "Psithurism", meaning: "The sound of rustling leaves", origin: "Greek", example: "She found psithurism soothing as she strolled through the forest."},
    {word: "Cacozelia", meaning: "Affecting a foreign accent or overly refined speech", origin: "Greek", example: "His cacozelia was evident when he tried too hard to sound sophisticated."},
    {word: "Redamancy", meaning: "The act of loving someone who loves you back", origin: "Latin", example: "Their relationship was built on redamancy, making it feel effortless and pure."},
];
function getTodayDateString() {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
}

function createWordCards() {
    const container = document.getElementById("word-container");
    container.innerHTML = ""; // 🔹 Clear the container before updating

    let storedData = JSON.parse(localStorage.getItem("wordData")) || { date: "", viewedWords: [], todaysWords: [] };

    // Reset daily selection if date changes
    if (storedData.date !== getTodayDateString()) {
        storedData.todaysWords = [];
        storedData.date = getTodayDateString();
    }

    // Get unseen words
    let unseenWords = words.filter(word => !storedData.viewedWords.some(w => w.word === word.word));

    // If less than 3 words are selected today, pick new unseen words
    if (storedData.todaysWords.length < 3 && unseenWords.length > 0) {
        let newWords = unseenWords.sort(() => Math.random() - 0.5).slice(0, 3 - storedData.todaysWords.length);
        storedData.todaysWords.push(...newWords);
        localStorage.setItem("wordData", JSON.stringify(storedData));
    }

    // Display today's words
    storedData.todaysWords.forEach(wordData => {
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
            let viewedWords = JSON.parse(localStorage.getItem("viewedWords")) || [];

            // Move to viewed words
            if (!storedData.viewedWords.some(w => w.word === wordData.word)) {
                storedData.viewedWords.push(wordData);
                viewedWords.push(wordData);
                localStorage.setItem("viewedWords", JSON.stringify(viewedWords));
                storedData.todaysWords = storedData.todaysWords.filter(w => w.word !== wordData.word);
                localStorage.setItem("wordData", JSON.stringify(storedData));
                displayViewedWords();
                createWordCards(); // 🔹 Refresh the displayed words
            }
        });

        container.appendChild(card);
    });

    displayViewedWords();
}

function displayViewedWords() {
    const viewedSection = document.getElementById("viewed-words");
    viewedSection.innerHTML = ""; // Clear previous content
    let storedData = JSON.parse(localStorage.getItem("wordData")) || { viewedWords: [] };

    storedData.viewedWords.forEach(word => {
        const wordDiv = document.createElement("div");
        wordDiv.classList.add("viewed-word");
        wordDiv.innerHTML = `<h3>${word.word}</h3><p>${word.meaning}</p>`;
        viewedSection.appendChild(wordDiv);
    });
}
createWordCards();