const svgSources = {
    bird: "img/bird.svg", 
    house: "img/house.svg", 
    tree: "img/tree.svg", 
    car: "img/car.svg"
};

let correctObject = ""; 
let selectedObjects = 0; 

// Modify the fetchSVG function to use 'no-cors' mode
async function fetchSVG(url) {
    try {
        const response = await fetch(url, { mode: 'no-cors' });
        if (!response.ok) throw new Error(`Failed to fetch SVG: ${url}`);
        return await response.text();
    } catch (error) {
        console.error(error);
        return '<text x="10" y="50" font-size="20">Error</text>'; 
    }
}

function randomizeCorrectObject() {
    const objects = Object.keys(svgSources);
    correctObject = objects[Math.floor(Math.random() * objects.length)];
}

function updateMessage(messageText) {
    const message = document.getElementById("OBJmessage");
    message.textContent = messageText;
}

function getRandomFigures() {
    const figures = Object.keys(svgSources);
    const randomFigures = [];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * figures.length);
        randomFigures.push(figures[randomIndex]);
    }
    return randomFigures;
}

async function createCompositeImage(container) {
    const svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgContainer.setAttribute("width", "200");
    svgContainer.setAttribute("height", "200");
    svgContainer.setAttribute("viewBox", "0 0 200 200");

    const cornerPositions = [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 0, y: 100 },
        { x: 100, y: 100 },
    ];

    const randomFigures = getRandomFigures();
    let index = 0;

    for (const figure of randomFigures) {
        const svgContent = await fetchSVG(svgSources[figure]);
        const gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
        gElement.setAttribute("id", figure);
        gElement.innerHTML = svgContent;

        const svgElement = gElement.querySelector("svg");
        if (svgElement) {
            svgElement.setAttribute("width", "100");
            svgElement.setAttribute("height", "100");
            svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
        }

        const position = cornerPositions[index];
        gElement.setAttribute("transform", `translate(${position.x}, ${position.y})`);

        gElement.addEventListener('click', () => handleClick(figure, gElement));

        svgContainer.appendChild(gElement);

        index++;
        if (index >= cornerPositions.length) break;
    }

    container.appendChild(svgContainer);
}

// Handle user click on an SVG object
function handleClick(object, element) {
    const message = document.getElementById("message");

    // Check if the object has already been clicked
    if (element.classList.contains("clicked")) {
        updateMessage("You've already clicked this object. Try another one!");
        return; // Prevent further action if already clicked
    }

    // Mark the object as clicked
    element.classList.add("clicked");

    if (object === correctObject) {
        element.closest("div").classList.add("correct");
        selectedObjects++;
        updateMessage(`Correct! ${selectedObjects} out of 4 objects selected.`);

        if (selectedObjects === 4) {
            document.getElementById("finishButton").classList.add("show");
        }
    } else {
        element.closest("div").classList.add("incorrect");
        updateMessage(`Incorrect. Try again! The correct object is a ${correctObject}.`);
        resetGame(); // Reset the game if the wrong object is clicked
    }
}

function resetGame() {
    selectedObjects = 0;
    document.getElementById("finishButton").classList.remove("show");
    const imageGrid = document.getElementById("imageGrid");
    imageGrid.innerHTML = ""; 
    randomizeCorrectObject(); // Randomize the correct object after resetting the game
    updateMessage(`Click on the ${correctObject}`); // Update the message with the new correct object
    initializeGrid(); 
}

async function initializeGrid() {
    const imageGrid = document.getElementById("imageGrid");
    for (let i = 0; i < 9; i++) {
        const div = document.createElement("div");
        await createCompositeImage(div);  
        imageGrid.appendChild(div);
    }
}

document.getElementById("finishButton").addEventListener('click', () => {
    alert("Congratulations! You've finished!");
    resetGame();
});

randomizeCorrectObject(); 
updateMessage(`Click on the ${correctObject}`);
initializeGrid();
