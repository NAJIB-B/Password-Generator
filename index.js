const password = document.querySelector(".password");

const length = document.querySelector(".length");

const generateBtn = document.querySelector(".generate");

const checkBox = document.querySelectorAll(".checkBox");

const copyBtn = document.querySelector(".copy");

class App {
  #length;
  #allChar = "abcdefghijklmnopqrstuvwxyz";
  #genPassword = "";

  constructor() {
    this._start();
    generateBtn.addEventListener("click", this._generate.bind(this));
    copyBtn.addEventListener("click", this._copy.bind(this));
  }

  _start() {
    length.focus();
    checkBox.forEach((check) => {
      check.addEventListener("change", this._checkBoxEvent.bind(this));
      check.addEventListener("change", this._forUncheck.bind(this));
    });
  }
  _generate() {
    const lengthValue = Number(length.value);

    if (lengthValue > 20) {
      alert(" number should be between 1 and 20");
      return;
    }
    this.#length = Number(length.value);
    if (!Number.isFinite(this.#length)) alert("insert number");
    this._generatePassword();
  }
  _generatePassword() {
    // this.#allChar =
    //   "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

    this.#genPassword = "";
    for (let i = 0; i < this.#length; i++) {
      const randomNumber =
        Math.floor(Math.random() * this.#allChar.length - 1) + 1;
      this.#genPassword += this.#allChar[randomNumber];
    }
    password.value = this.#genPassword;
  }
  _checkBoxEvent(e) {
    if (e.target.checked) {
      if (e.target.name === "uppercase") {
        this.#allChar += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }

      if (e.target.name === "number") {
        this.#allChar += "0123456789";
      }
      if (e.target.name === "spchar") {
        this.#allChar += "!@#$%&";
      }
    }
  }
  _forUncheck(e) {
    if (!e.target.checked) {
      if (e.target.name === "uppercase") {
        const x = this.#allChar.split("");
        const y = x.filter((i) => {
          return i >= "A" && i > "Z";
        });
        this.#allChar = y.join("");
      }

      if (e.target.name === "number") {
        const x = this.#allChar.split("");
        const y = x.filter((i) => {
          return i >= "0" && i > "9";
        });
        this.#allChar = y.join("");
      }
      if (e.target.name === "spchar") {
        const x = this.#allChar.split("");
        const y = x.filter((i) => {
          return i >= "!" && i > "&";
        });
        this.#allChar = y.join("");
      }
    }
  }
  _copy() {
    navigator.clipboard.writeText(this.#genPassword).then(
      function () {},
      function () {}
    );
  }
}

const app = new App();
