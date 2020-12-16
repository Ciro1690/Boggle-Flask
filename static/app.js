const button = document.querySelector('button');

button.addEventListener('click', function (e) {
    e.preventDefault()
    const guess = document.querySelector('#guess').value
    submit_guess(guess)
})

async function submit_guess(post) {
    axios.post('http://127.0.0.1:5000/submit-guess', {
    post
    })
    .then(function (response) {
        console.log(response.data);
    })
}
