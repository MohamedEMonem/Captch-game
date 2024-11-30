const svgSources = {
    bird: "img/bird.svg", 
    house: "img/house.svg", 
    tree: "img/tree.svg", 
    car: "img/car.svg",
    monkey: "img/monkey.svg",
    sun: "img/sun.svg",
    cloud: "img/cloud.svg",
    rose: "img/rose.svg",
    apple: "img/apple.svg",
};

let correctObject = ""; 
let selectedObjects = 0; 

// Fetch SVG
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

// Randomize the correct object
function randomizeCorrectObject() {
    const objects = Object.keys(svgSources);
    correctObject = objects[Math.floor(Math.random() * objects.length)];
}

// Update the game message
function updateMessage(messageText) {
    const message = document.getElementById("OBJmessage");
    message.textContent = messageText;
}

// Initialize the grid and ensure correct objects are spread across the grid
async function initializeGrid() {
    const imageGrid = document.getElementById("imageGrid");
    imageGrid.innerHTML = ""; // Clear the grid for a new game
    const totalGrids = 9; // Number of grid cells
    const correctObjectCount = 4; // Ensure 4 correct objects

    const positions = Array.from({ length: totalGrids }, (_, i) => i);
    const shuffledPositions = positions.sort(() => Math.random() - 0.5);
    const correctPositions = shuffledPositions.slice(0, correctObjectCount);

    for (let i = 0; i < totalGrids; i++) {
        const div = document.createElement("div");

        // If this is a correct position, include the correct object
        if (correctPositions.includes(i)) {
            await createCompositeImage(div, correctObject, true);
        } else {
            await createCompositeImage(div, correctObject, false);
        }

        imageGrid.appendChild(div);
    }
}

// Create a composite image with 4 smaller SVG objects in a grid
async function createCompositeImage(container, correctObject, includeCorrect) {
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

    const figures = Object.keys(svgSources);
    const objectsToInclude = [];

    if (includeCorrect) {
        // Ensure the correct object is included exactly once
        objectsToInclude.push(correctObject);
        while (objectsToInclude.length < 4) {
            const randomObject = figures[Math.floor(Math.random() * figures.length)];
            if (!objectsToInclude.includes(randomObject)) {
                objectsToInclude.push(randomObject);
            }
        }
    } else {
        // Exclude the correct object and pick 4 random objects
        while (objectsToInclude.length < 4) {
            const randomObject = figures[Math.floor(Math.random() * figures.length)];
            if (randomObject !== correctObject && !objectsToInclude.includes(randomObject)) {
                objectsToInclude.push(randomObject);
            }
        }
    }

    // Shuffle objects to randomize their positions
    objectsToInclude.sort(() => Math.random() - 0.5);

    for (let i = 0; i < cornerPositions.length; i++) {
        const object = objectsToInclude[i];
        const svgContent = await fetchSVG(svgSources[object]);

        const gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
        gElement.setAttribute("id", object);
        gElement.innerHTML = svgContent;

        const svgElement = gElement.querySelector("svg");
        if (svgElement) {
            svgElement.setAttribute("width", "100");
            svgElement.setAttribute("height", "100");
            svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
        }

        const position = cornerPositions[i];
        gElement.setAttribute("transform", `translate(${position.x}, ${position.y})`);

        gElement.addEventListener('click', () => handleClick(object, gElement));

        svgContainer.appendChild(gElement);
    }

    container.appendChild(svgContainer);
}

// Handle user clicks
function handleClick(object, element) {
    if (element.classList.contains("clicked")) {
        updateMessage("You've already clicked this object. Try another one!");
        return;
    }

    element.classList.add("clicked");

    if (object === correctObject) {
        selectedObjects++;
        updateMessage(`Correct! ${selectedObjects} out of 4 objects selected.`);
        element.closest("div").classList.add("correct");

        if (selectedObjects === 4) {
            document.getElementById("finishButton").classList.add("show");
        }
    } else {
        updateMessage(`Incorrect! The correct object is a ${correctObject}. Try again!`);
        resetGame();
    }
}

// Reset the game
function resetGame() {
    selectedObjects = 0;
    document.getElementById("finishButton").classList.remove("show");
    randomizeCorrectObject(); // Randomize the correct object for the next round
    updateMessage(`Click on the ${correctObject}`);
    initializeGrid(); // Reinitialize the grid
}

// Initialize the game
document.getElementById("finishButton").addEventListener('click', () => {
    alert("Congratulations! You've finished!");
    resetGame();
});

// Start the game
randomizeCorrectObject();
updateMessage(`Click on the ${correctObject}`);
initializeGrid();
