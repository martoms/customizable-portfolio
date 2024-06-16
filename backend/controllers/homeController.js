const quotes_get = (req, res) => {
    fetch('https://zenquotes.io/api/random/')
    .then(response => response.json())
    .then(data => res.status(200).json(data[0]))
    .catch(err => res.status(500).json(err.message))
};

const jokes_get = (req, res) => {
    fetch('https://v2.jokeapi.dev/joke/Pun?blacklistFlags=religious,racist,sexist,explicit')
    .then(response => response.json())
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err.message))
};

const trivias_get = (req, res) => {
    fetch('https://opentdb.com/api.php?amount=1')
    .then(response => response.json())
    .then(data => res.status(200).json(data?.results[0]))
    .catch(err => res.status(500).json(err.message))
};

module.exports = {
    quotes_get,
    jokes_get,
    trivias_get
}