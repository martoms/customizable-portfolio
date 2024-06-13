const getQuote = (setQuote, setErr) => {
    fetch('https://zenquotes.io/api/random/')
    .then(res => {
        if (!res.ok) {
            throw Error('There seems to be a problem fetching quotes.');
        } else {
            return res.json();
        }
    })
    .then(data => {
        setQuote(data)
    })
    .catch(err => {
        setErr(err.message)
    })
}
 
export default getQuote;