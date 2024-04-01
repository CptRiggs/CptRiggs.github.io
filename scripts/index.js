const greetings = ["Welcome! :)", "Bonjour !", "¡Hola!"];
let currentGreetingIndex = 0;
let currentText = '';
let letterIndex = 0;
const speed = 100; // Typing speed in milliseconds

function typeWriter() {
  if (letterIndex < greetings[currentGreetingIndex].length) {
    currentText += greetings[currentGreetingIndex].charAt(letterIndex);
    document.getElementById("head").textContent = currentText;
    letterIndex++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(eraseText, 2000); // Wait for 1 second before erasing
  }
}

function eraseText() {
  if (currentText.length > 0) {
    currentText = currentText.slice(0, -1);
    document.getElementById("head").innerHTML = currentText;
    setTimeout(eraseText, speed);
  } else {
    currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length; // Move to the next greeting
    letterIndex = 0; // Reset letter index
    setTimeout(typeWriter, 500); // Wait for 0.5 seconds before typing next greeting
  }
}