// Obsługa przycisku wyślij
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');

sendBtn.addEventListener('click', () => {
    if (chatInput.value.trim() !== "") {
        alert("Wysłano zapytanie do AI: " + chatInput.value);
        chatInput.value = "";
    }
});

// Obsługa wgrywania CV
const fileInput = document.getElementById('cv-file');
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        alert("Wczytano CV: " + file.name + ". Logika analizy AI zostanie dodana w kolejnym kroku.");
    }
});