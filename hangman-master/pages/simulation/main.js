class Hangman {

	constructor() {
		this.wordEl = document.querySelector('#word');
		this.figureParts = document.querySelectorAll('.figure-part');
		this.figureParts.forEach(part => part.style.display = 'none');

		this.attempts = 6;
		this.hits = 0;
		this.misses = 0;
		this.interations = 0;

		this.words = ['cat', 'milk', 'mixer'];
		this.possibleLetters = this.words.join("");

		this.winnerBox = document.getElementById("winnerBox");
		this.numOfGuessesBox = document.getElementById("numOfGuessesBox");

		this.isGameWon = null;

		this.selectedWord = this.words[Math.floor(Math.random() * this.words.length)];
		this.pickedLetters = new Array(this.selectedWord.length).fill('');
		this.output();

		this.init();
	}

	init = () => {
		this.startGame = () => {
			this.interations++;
			if(this.isGameWon === true || this.isGameWon === false) {
				clearInterval(this.interval);
				return;
			}
			this.selectedLetter = this.possibleLetters[Math.floor(Math.random() * this.possibleLetters.length)];
			this.gameResult = this.startSimulation(this.selectedLetter);

			if(this.gameResult === true) {
				alert('You have won! The game is over');

				this.winnerBox.value = "simulation";
				this.numOfGuessesBox.value = this.interations;

				this.isGameWon = true;
				this.output();
			} else if (this.gameResult === false) {
				alert('You have lost! The game is over');

				this.winnerBox.value = "system";
				this.numOfGuessesBox.value = this.interations;

				this.isGameWon = false;
				this.output();
			}
		}

		this.interval = setInterval(this.startGame, 1000);
	}

	startSimulation = (letter) => {
		if (this.hits != this.selectedWord.length) {
			if (this.pickedLetters.includes(letter)) {
				return undefined;
			}
	
			if (this.selectedWord.includes(letter)) {
				if (this.hits === this.selectedWord.length) {
					return true;
				}
	
				let indexLetter = this.selectedWord.split('').findIndex(el => el === letter);
				this.pickedLetters[indexLetter] = this.selectedWord[indexLetter];
	
				this.hits++;
	
				this.output();
				this.sleep(5000);
			} else {
				this.figureParts[this.misses].style.display = 'block';
				
				if (this.misses === this.attempts - 1) {
					return false;
				}
	
				this.misses++;
			}
		} else return true;
	}

	output = () => {
		this.wordEl.innerHTML = '';

		this.pickedLetters.forEach(letter => {
			this.wordEl.innerHTML += `<span class="letter">${letter ? letter : ''}</span>`;
		});
	}
}

new Hangman();