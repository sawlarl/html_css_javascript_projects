function appendValue(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function deleteChar() {
  let display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function calculate() {
  let display = document.getElementById("display").value;

  try {
    document.getElementById("display").value = eval(display);
  } catch (error) {
    alert("Invalid Input");
  }
}
