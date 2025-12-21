const fileInput = document.getElementById('cv-file');
const WEBHOOK_URL = 'https://mz11.app.n8n.cloud/webhook/cv-upload'; // Wklej swój adres Webhooka

fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Zmiana wyglądu przycisku (pokazujemy, że "coś się dzieje")
    const btn = document.querySelector('.cv-upload-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = "Wysyłanie...";
    btn.style.opacity = "0.5";

    // 2. Przygotowanie danych do wysyłki (FormData)
    const formData = new FormData();
    formData.append('cv_file', file);
    formData.append('user_query', document.getElementById('chat-input').value);

    try {
        // 3. Wysyłka do n8n
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: formData
            // Nie dodajemy nagłówka Content-Type, przeglądarka zrobi to sama dla FormData
        });

        if (response.ok) {
            const data = await response.json();
            alert("Sukces! n8n odebrał plik.");
            console.log("Odpowiedź z n8n:", data);
        } else {
            alert("Błąd serwera: " + response.status);
        }
    } catch (error) {
        console.error("Błąd wysyłki:", error);
        alert("Nie udało się połączyć z n8n. Sprawdź CORS!");
    } finally {
        // Przywrócenie przycisku
        btn.innerHTML = originalText;
        btn.style.opacity = "1";
    }
});