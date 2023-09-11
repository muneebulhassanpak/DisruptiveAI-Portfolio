
const OPENAI_API_KEY = "#";
const submitButton = document.getElementById('submitButton');
const output = document.getElementById('output');
const inputElement = document.getElementById('inputPrompt');
let input = document.getElementById('input');


let text_field_data = "";





async function getMessage() {
    text_field_data = inputElement.value;

    if (text_field_data.trim() === "") {
        alert("The input field is empty")
        // Handle empty input
        return;
    }


    appendMessage(text_field_data, 'user');
    inputElement.value = ""


    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role:'user', content: `${text_field_data}`}],
        })
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();


        const botResponse = data.choices[0].message.content;

        // Add bot's response to the conversation history
        appendMessage(botResponse, 'bot');

        // Clear the input field
        inputElement.value = "";
    } catch (error) {
        console.log(error);
        alert("Error add api key")
    }
}


// Function to append messages to the message container
function appendMessage(content, role) {
    const messageContainer = document.getElementById('messageContainer');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', role + '-message');
    messageDiv.textContent = content;
    messageContainer.appendChild(messageDiv);


}

submitButton.addEventListener('click', getMessage);
