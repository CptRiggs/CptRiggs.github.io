const greetings = ["Welcome! :)", "Bonjour !", "¡Hola!"];
let currentGreetingIndex = 0;
let currentText = '';
let letterIndex = 0;
const speed = 100;

function typeWriter() {
  if (letterIndex < greetings[currentGreetingIndex].length) {
    currentText += greetings[currentGreetingIndex].charAt(letterIndex);
    document.getElementById("head").textContent = currentText;
    letterIndex++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(eraseText, 2000);
  }
}

function eraseText() {
  if (currentText.length > 0) {
    currentText = currentText.slice(0, -1);
    document.getElementById("head").innerHTML = currentText;
    setTimeout(eraseText, speed);
  } else {
    currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
    letterIndex = 0;
    setTimeout(typeWriter, 500);
  }
}