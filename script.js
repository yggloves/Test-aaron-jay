document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const startGameButton = document.getElementById('start-game');
    const instructionsModal = document.getElementById('instructions');
    const words = [
        "Forest", "Lime", "Mint", "Olive",
        "Coffee", "Tea", "Red Bull", "Coca-Cola",
        "Plane", "Eagle", "Rocket", "Helicopter",
        "Gouda", "Cheddar", "Mozzarella", "Swiss"
    ];

    const correctGroups = {
        'Shades of Green': ["Forest", "Lime", "Mint", "Olive"],
        'Drinks that have caffeine': ["Coffee", "Tea", "Red Bull", "Coca-Cola"],
        'Things that fly': ["Plane", "Eagle", "Rocket", "Helicopter"],
        'Types of Cheese': ["Gouda", "Cheddar", "Mozzarella", "Swiss"]
    };

    let selectedButtons = [];
    let correctSelections = new Set();

    startGameButton.addEventListener('click', () => {
        instructionsModal.style.display = 'none';
        initializeGame();
    });

    function initializeGame() {
        shuffle(words);
        words.forEach(word => {
            const button = document.createElement('button');
            button.textContent = word;
            button.addEventListener('click', () => handleButtonClick(button));
            gameContainer.appendChild(button);
        });
    }

    function handleButtonClick(button) {
        if (correctSelections.has(button)) return;

        if (selectedButtons.includes(button)) {
            button.classList.remove('selected');
            selectedButtons = selectedButtons.filter(btn => btn !== button);
        } else {
            button.classList.add('selected');
            selectedButtons.push(button);
        }

        if (selectedButtons.length === 4) {
            checkSelection();
        }
    }

    function checkSelection() {
        const selectedWords = selectedButtons.map(btn => btn.textContent);
        let isCorrect = false;
        let theme = '';

        for (const [groupTheme, groupWords] of Object.entries(correctGroups)) {
            if (arrayEquals(selectedWords, groupWords)) {
                isCorrect = true;
                theme = groupTheme;
                break;
            }
        }

        if (isCorrect) {
            selectedButtons.forEach(button => {
                button.classList.add('correct');
                button.classList.remove('selected');
                correctSelections.add(button);
            });
            alert(`Correct! Theme: ${theme}`);
        } else {
            selectedButtons.forEach(button => button.classList.add('incorrect'));
            setTimeout(() => {
                selectedButtons.forEach(button => {
                    button.classList.remove('incorrect');
                    button.classList.remove('selected');
                });
                selectedButtons = [];
            }, 2000);
        }
        
        selectedButtons = [];
    }

    function arrayEquals(arr1, arr2) {
        return arr1.sort().join(',') === arr2.sort().join(',');
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
