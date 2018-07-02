const axios = require("axios");

let randomTrivia = {};
let favorites = [];



function getRandom(req, res, next) {
    axios.get(`http://numbersapi.com/1..100`)
        .then(response => {
            console.log(response)
            randomTrivia = response.data
            res.status(200).json(randomTrivia);
        });

}

function saveFact(req, res, next) {
    // console.log(req.body);
    favorites.push(req.body.fact);
    res.status(200).json(favorites);
}

function deleteFact(req, res, next) {
    favorites.forEach((fact, index) => {
        if (index == req.params.id) {
            favorites.splice(index, 1);
        }
    });
    res.status(200).json(favorites);
}

function updateFact(req, res, next) {
    favorites[req.params.index] = req.body.newText;
    res.status(200).json(favorites);
}
module.exports = {
    getRandom,
    saveFact,
    deleteFact,
    updateFact
};
