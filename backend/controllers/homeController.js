const quotes_get = (req, res) => {
    fetch('https://zenquotes.io/api/random/')
    .then(response => response.json())
    .then(data => {
        res.status(200).json(data[0]);
    })
    .catch(err => {
        res.status(500).json(err.message);
    })
}

module.exports = {
    quotes_get
}