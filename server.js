require('dotenv').config(); // Charge les variables depuis .env

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const { body, validationResult } = require('express-validator');

app.post('/send-mail',
    [
        body('email').isEmail().withMessage('L\'adresse email est invalide.'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Votre logique d'envoi d'email ici
    }
);

const app = express();
const PORT = 3000; // Changez si nécessaire

// Middleware pour servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static('public'));

// Middleware pour parser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route pour le formulaire de contact
app.post(
  '/send-mail',
  // Valider les champs envoyés par le formulaire
  [
    body('name').notEmpty().withMessage('Le nom est requis.'),
    body('email').isEmail().withMessage('L\'adresse email est invalide.'),
    body('message').notEmpty().withMessage('Le message ne peut pas être vide.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Renvoie les erreurs si les validations échouent
      return res.status(400).json({ errors: errors.array() });
    }

    // Récupération des données
    const { name, email, message } = req.body;

    // Configurer le transporteur Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Définir les options de l'email
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL, // Vous recevez le message
      subject: `Nouveau message de ${name}`,
      text: `Vous avez reçu un message :\n\nNom : ${name}\nEmail : ${email}\nMessage :\n${message}`,
    };

    try {
      // Envoie l'email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Votre message a été envoyé avec succès !' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
      res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
    }
  }
);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

