function prepareMailto(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupération des données du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Construction de l'URL mailto
    const mailtoLink = `mailto:digitaledominance2@gmail.com?subject=Message%20de%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AContact:%20${encodeURIComponent(email)}`;

    // Redirection vers le lien mailto
    window.location.href = mailtoLink;
}
