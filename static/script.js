document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("user-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") sendMessage();
    });
});

function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    
    fetch("/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        chatBox.innerHTML += `<p><strong>AI:</strong> ${data.mood}</p>`;
        document.getElementById("user-input").value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => console.error("Error:", error));
}
