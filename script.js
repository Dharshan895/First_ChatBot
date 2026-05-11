const chatBox = document.getElementById("chat-box");
const input = document.getElementById("message");
const sendBtn = document.getElementById("send-btn");

/* Send button click */
sendBtn.addEventListener("click", sendMessage);

/* Enter key */
input.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
        sendMessage();
    }

});

/* Main Function */
async function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    /* Add user message */
    addMessage(text, "user");

    /* Clear input */
    input.value = "";

    /* Create bot message container */
    const botDiv = document.createElement("div");

    botDiv.classList.add("message", "bot");

    chatBox.appendChild(botDiv);

    scrollToBottom();

    try {

        /* Send to backend */
        const response = await fetch("http://localhost:8000/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: text
            })

        });

        const data = await response.json();

        /* Typing effect */
        typeText(botDiv, data.reply);

    } catch (error) {

        botDiv.textContent = "Error connecting to backend.";

    }

}

/* Add Message */
function addMessage(text, sender) {

    const div = document.createElement("div");

    div.classList.add("message", sender);

    div.textContent = text;

    chatBox.appendChild(div);

    scrollToBottom();

}

/* Typing Animation */
function typeText(element, text) {

    let index = 0;

    const interval = setInterval(() => {

        element.textContent += text.charAt(index);

        index++;

        scrollToBottom();

        if (index >= text.length) {
            clearInterval(interval);
        }

    }, 20);

}

/* Auto Scroll */
function scrollToBottom() {

    chatBox.scrollTop = chatBox.scrollHeight;

}