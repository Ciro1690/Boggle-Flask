const button = document.querySelector('button');
const messages = document.querySelector('.message')
const words = document.querySelector('.words')
const score = document.querySelector('.score')
const time = document.querySelector('.time')

let current_score = 0
score.innerHTML = current_score
let time_left = 1000 * 60
let timer
time.innerHTML = "0:" + time_left / 1000;

function Timer() {
    if (time_left == 60000)
        timer = setInterval(Timer, 1000)
    seconds -= 1000;
    time.innerHTML = '0:' + seconds / 1000;
    if (seconds <= 0) {
        clearInterval(timer);
        alert("Game over");
    }
} 

button.addEventListener('click', async function handleSubmit(e) {
    e.preventDefault()
    Timer()
    const guess = document.querySelector('#guess').value
    const resp = await axios.get('/check-word', { params: { 'word': guess } });
    console.log(resp.data.result)
    messages.innerHTML = resp.data.result

    if (resp.data.result === "not-on-board") {
        console.log('NOB')
    }
    else if(resp.data.result === "not-word") {
        console.log('NW')
    }
    else if(resp.data.result === "ok") {
        let correct_word = document.createElement("p");  // Create with DOM
        correct_word.innerHTML = guess;
        words.append(correct_word); 
        
        points = guess.length
        current_score += points
        score.innerHTML = current_score
    }
})