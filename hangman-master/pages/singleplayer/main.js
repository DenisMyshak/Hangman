
class Hangman {

	constructor() {
		this.wordEl = document.querySelector('#word');
		this.figureParts = document.querySelectorAll('.figure-part');

		this.attempts = 6;
		this.hits = 0;
		this.misses = 0;

		this.interations = 0;
		this.userName = "";

		this.winnerBox = document.getElementById("winnerBox");
		this.numOfGuessesBox = document.getElementById("numOfGuessesBox");

		this.words = ['cat', 'milk', 'mixer'];
		this.hints = [
			'the first letter is c',
			'the last letter is k',
			'using it you can make a cake'
		]

		this.init();
	}

	init = () => {
		window.addEventListener('keydown', this.press);
		this.start();
	}

	buildHint = (selectedWord, selectedWordIndex) => {
		this.hintContainer = document.createElement("div");
		this.hintContainer.className = "hint-container";

		this.hintText = document.createElement("span");
		this.hintText.className = "hint-text";
		this.hintText.innerHTML = `${this.hints[this.selectedWordIndex]}`;

		this.hintButton = document.createElement("button");
		this.hintButton.className = "hint-button";
		this.hintButton.innerHTML = "Show hint";
		this.hintButton.onclick = () => {
			this.hintText.style.display = "block";
		}

		this.hintContainer.appendChild(this.hintButton);
		this.hintContainer.appendChild(this.hintText);

		document.body.appendChild(this.hintContainer);
	}

	press = (e) => {
		this.interations++;
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			if (this.pickedLetters.includes(e.key)) {
				alert('This letter already exists!');
				return false;
			}

			if (this.selectedWord.includes(e.key)) {
				if (this.hits === this.selectedWord.length - 1) {
					alert('You have won! The game is over');

					this.winnerBox.value = this.userName;
					this.numOfGuessesBox.value = this.interations;

					document.body.getElementsByClassName("hint-container")[0].remove();
					setTimeout(() => this.start(), 5000);
				}

				let indexLetter = this.selectedWord.split('').findIndex(el => el === e.key);
				this.pickedLetters[indexLetter] = this.selectedWord[indexLetter];

				this.hits++;

				this.output();
			} else {
				this.figureParts[this.misses].style.display = 'block';

				if (this.misses === this.attempts - 1) {
					alert('You have lost! The game is over');

					this.winnerBox.value = "system";
					this.numOfGuessesBox.value = this.interations;

					document.body.getElementsByClassName("hint-container")[0].remove();
					setTimeout(() => this.start(), 5000);
				}

				this.misses++;
			}
		}
	}

	output = () => {
		this.wordEl.innerHTML = '';

		this.pickedLetters.forEach(letter => {
			this.wordEl.innerHTML += `<span class="letter">${letter ? letter : ''}</span>`;
		});
	}

	start = () => {
		this.isInputOver = false;

		while(!this.isInputOver) {
			const userNameInput = prompt("Enter your name: ");
			if (userNameInput.length === 0) {
				alert("String can not be empty");
				continue;
			}
			this.userName = userNameInput;
			this.isInputOver = true;
		}

		this.figureParts.forEach(part => part.style.display = 'none');

		this.selectedWord = this.words[Math.floor(Math.random() * this.words.length)];
		this.selectedWordIndex = this.words.indexOf(this.selectedWord);

		this.pickedLetters = new Array(this.selectedWord.length).fill('');

		this.buildHint(this.selectedWord, this.selectedWordIndex);

		this.hits = 0;
		this.misses = 0;

		this.output();
	}
}

new Hangman();