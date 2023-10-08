const ws = new WebSocket(`ws://${window.document.location.host}`);
ws.binaryType = "blob";

ws.addEventListener("open", () => {
  console.log("Websocket connection opened");
});
ws.addEventListener("close", () => {
  console.log("Websocket connection closed");
});

ws.onmessage = function (message) {

  const msgDiv = document.createElement("div");
  msgDiv.classList.add("msgCtn");

  if (message.data instanceof Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      msgDiv.textContent = reader.result;
      document.getElementById("messages").appendChild(msgDiv);
    };
    reader.readAsText(message.data);
  } else {
    console.log("Result2: " + message.data);
    msgDiv.textContent = message.data;
    document.getElementById("messages").appendChild(msgDiv);
  }
};

const form = document.getElementById("msgForm");
const inputBox = document.getElementById("inputBox");
const errorMsg = document.getElementById("error");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!inputBox.value.trim()) {
    errorMsg.style.display = "block";
    return;
  } else {
    errorMsg.style.display = "none";
  }

  ws.send(inputBox.value);
  inputBox.value = "";
});
