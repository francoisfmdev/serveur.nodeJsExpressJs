// appelle de fichier http
const http = require('http');

// appelle de fichier express
const express = require('express');

// appelle fichier mongoose 
const mongoose = require('mongoose');

//connection base de données mongoDB
mongoose.connect('mongodb+srv://FrancoisFMDEV:0000@cluster0.qpzmz.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// creation constante app à partir express
const app = express();

// Utilisation d'un middleware pour récuperer lebod d'une requete
const bodyParser = require('body-parser');


const stuff = [
    {
        _id: 0,
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
    },
    {
        _id: 1,
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
    },
];


//Définition du port utilisé 
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);
app.use(bodyParser.json());

//Utilisation d'un middleware pour configuer les headers pour acces crontol Allow origin (accepte plusieurs connexion local)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//simple utilisation d'un post
app.post('/api/stuff', (req, res) => {
    console.log(req.body);

    var nwstuff = {
        _id: '...',
        title: '...',
        description: '...',
        imageUrl: '...',
        price: 100,
        userId: '...',
    }
    stuff.push(nwstuff);
    res.status(201).json(stuff);
});
//simple get 
app.get('/', (req, res) => {

    res.status(200);
    res.json(stuff);

})


//ecoute du sur le port 
server.listen(process.env.PORT || 3000);