
class Hangman {

	constructor() {
		this.wordEl = document.querySelector('#word');
		this.figureParts = document.querySelectorAll('.figure-part');

		this.userName1 = "";
		this.userName2 = "";
		this.interations = 0;

		this.winnerBox = document.getElementById("winnerBox");
		this.numOfGuessesBox = document.getElementById("numOfGuessesBox");

		this.attempts = 6;
		this.hits = 0;
		this.misses = 0;
		this.pickedLetters = null;
		this.init();

	}

	init = () => {
		window.addEventListener('keydown', this.press);
		this.start();
	}

	press = (e) => {
		this.interations++;
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			if (this.pickedLetters.includes(e.key)) {
				alert('This letter already exists!');
				return false;
			}

			if (this.userWord.includes(e.key)) {
				if (this.hits === this.userWord.length - 1) {
					alert('You have won! The game is over');

					this.winnerBox.value = this.userName2;
					this.numOfGuessesBox.value =this.interations;

					this.deleteHint();
					setTimeout(() => this.start(), 5000);
				}

				let indexLetter = this.userWord.split('').findIndex(el => el === e.key);
				this.pickedLetters[indexLetter] = this.userWord[indexLetter];

				this.hits++;

				this.output();
			} else {
				this.figureParts[this.misses].style.display = 'block';

				if (this.misses === this.attempts - 1) {
					alert('You have lost! The game is over')

					this.winnerBox.value = this.userName1;
					this.numOfGuessesBox.value = 5;

					this.deleteHint();
					setTimeout(() => this.start(), 5000);
				}

				this.misses++;
			}
		}
	}

	buildHint = (hint) => {
		this.hintContainer = document.createElement("div");
		this.hintContainer.className = "hint-container";

		this.hintText = document.createElement("span");
		this.hintText.className = "hint-text";
		this.hintText.innerHTML = `${hint}`;

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

	deleteHint = () => {
		document.body.getElementsByClassName("hint-container")[0].remove();
	}

	output = () => {
		this.wordEl.innerHTML = '';

		this.pickedLetters.forEach(letter => {
			this.wordEl.innerHTML += `<span class="letter">${letter ? letter : ''}</span>`;
		});
	}

	takeNameInput = (userId) => {
		this.isNameInputOver = false;
		while (!this.isNameInputOver) {
			const userNameInput = prompt("Enter your name: ");
			if (userNameInput.length === 0) {
				alert("String can not be empty");
				continue;
			}
			if (userId == 1) this.userName1 = userNameInput;
			else this.userName2 = userNameInput;
			this.isNameInputOver = true;
		}
	}

	start = () => {

		this.takeNameInput(1);

		this.isInputOver = false;
		this.userWord = "";

		while (!this.isInputOver) {
			let isLetterRepeats = false;
			const userWordInput = prompt("Enter the word");
			const letters = [];
			for (let letter of userWordInput) {
				if (!letters.includes(letter)) {
					letters.push(letter);
					continue;
				}
				alert("You are not allowed to enter two same letters. Please try again");
				isLetterRepeats = true;
				break;
			}
			if (!isLetterRepeats) {
				this.isInputOver = true;
				this.userWord = userWordInput;
			}
		}

		this.hint = prompt("Enter the hint");
		this.buildHint(this.hint);

		this.takeNameInput(2);

		this.figureParts.forEach(part => part.style.display = 'none');
		this.pickedLetters = new Array(this.userWord.length).fill('');

		this.hits = 0;
		this.misses = 0;

		this.output();
	}
}

new Hangman();