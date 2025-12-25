const fileInput = document.getElementById('cv-file');
const sendBtn = document.getElementById('send-btn');
const fileInfo = document.getElementById('file-info');
const fileNameDisplay = document.getElementById('file-name');
const WEBHOOK_URL = 'https://mz11.app.n8n.cloud/webhook/cv-upload';

// Obsługa wyboru pliku
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileNameDisplay.textContent = file.name;
        fileInfo.style.display = 'flex';
        document.querySelector('.upload-content').style.opacity = '0.5';
    }
});

// Obsługa wysyłki
sendBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) return;

    sendBtn.innerHTML = "Wysyłanie...";
    sendBtn.disabled = true;

    const formData = new FormData();
    formData.append('cv_file', file);
    formData.append('user_query', document.getElementById('chat-input').value);

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("Plik wysłany pomyślnie!");
            // Reset interfejsu
            fileInfo.style.display = 'none';
            document.querySelector('.upload-content').style.opacity = '1';
        } else {
            alert("Błąd: " + response.status);
        }
    } catch (error) {
        alert("Błąd połączenia z n8n.");
    } finally {
        sendBtn.innerHTML = "Analizuj teraz";
        sendBtn.disabled = false;
    }
});