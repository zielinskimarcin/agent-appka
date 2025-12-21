// Prosta obsługa wgrywania pliku
document.getElementById('cv-upload').addEventListener('change', function(e) {
    const fileName = e.target.files[0].name;
    if (fileName) {
        alert('Wybrano plik: ' + fileName + '. Teraz możesz zaprogramować logikę analizy AI!');
    }
});