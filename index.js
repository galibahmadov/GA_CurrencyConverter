window.addEventListener('load', getResult);

let leftValue = document.getElementById('left-input');
let rightValue = document.getElementById('right-input');

let have = document.querySelectorAll('.i-have');
let want = document.querySelectorAll('.i-want');

have.forEach(item => item.addEventListener('click', clicked));
want.forEach(item => item.addEventListener('click', clicked));

let iHave;
let iWant;

let leftResponse;
let rightResponse;

let leftDiv = document.getElementById('left-div');
let rightDiv = document.getElementById('right-div');

let left = leftDiv.getBoundingClientRect().left;
let right = rightDiv.getBoundingClientRect().left;

let arrowButton = document.getElementById('button');
arrowButton.addEventListener('click', toggle);

function getResult() {
    iHave = 'RUB';
    iWant = 'USD';
    getResponse();
    leftValue.addEventListener('input', calculateRight);
    rightValue.addEventListener('input', calculateLeft);
}

let leftp = document.getElementById('left-description');
let rightp = document.getElementById('right-description');

function calculateRight() {
    let cleanleftValue = cleaner(leftValue.value);
    setTimeout(() => {
        leftValue.value = cleanleftValue;
    }, 0);
    if (leftValue.value === '.') {
        rightValue.value = 0;
    } else {
        rightValue.value = cleanleftValue * +leftResponse.rates[iWant].toFixed(4);
        leftp.innerText = `1 ${iHave} = ${+leftResponse.rates[iWant].toFixed(4)} ${iWant}`
        rightp.innerText = `1 ${iWant} = ${(1 / +leftResponse.rates[iWant]).toFixed(4)} ${iHave}`
    }
}

function calculateLeft() {
    let cleanrightValue = cleaner(rightValue.value);
    setTimeout(() => {
        rightValue.value = cleanrightValue;
    }, 0);
    if (rightValue.value === '.') {
        leftValue.value = 0;
    } else {
    leftValue.value = cleanrightValue * +rightResponse.rates[iHave].toFixed(4);
    }
}

function clicked(e) {
    if (e.target.classList.contains('i-have')) {
        have.forEach(item => item.classList.remove('clicked'));
        if (e.target.classList.contains('currency')) {
            iHave = e.target.innerText;
        } else if (e.target.classList.contains('select')) {
            iHave = e.target.value;
        }
    }
    if (e.target.classList.contains('i-want')) {
        want.forEach(item => item.classList.remove('clicked'));
        if (e.target.classList.contains('currency')) {
            iWant = e.target.innerText;
        } else if (e.target.classList.contains('select')) {
            iWant = e.target.value;
        }
    }
    e.target.classList.add('clicked');
    getResponse();
}

function getResponse() {
    document.querySelector('.ghost').classList.remove('hidden');
    let responseL = fetch(`https://api.ratesapi.io/api/latest?base=${iHave}&symbols=${iWant}`);
    let responseR = fetch(`https://api.ratesapi.io/api/latest?base=${iWant}&symbols=${iHave}`);
    Promise.all([
        responseL,
        responseR
    ]).then(
        responses => Promise.all([
            responses[0].json(),
            responses[1].json()
        ]).then(
            (res) => {
                leftResponse = res[0];
                rightResponse = res[1];
                calculateRight();
            }
        )
    )
        .catch(() => setTimeout(() => {
            alert('Right now our server is not responding.\nPlease try again later')
        }, 100))
        .finally(() => document.querySelector('.ghost').classList.add('hidden'));
}

function toggle() {
    leftDiv.classList.add('absolute');
    rightDiv.classList.add('absolute');
    leftDiv.style.right = 0;
    rightDiv.style.left = 0;
    leftDiv.style.left = '';
    document.getElementById('left-p').innerText = 'Хочу приобрести';
    document.getElementById('right-p').innerText = 'У меня есть';
    arrowButton.removeEventListener('click', toggle);
    arrowButton.addEventListener('click', reverseToggle);
}

function reverseToggle() {
    leftDiv.style.left = 0;
    rightDiv.style.right = 0;
    rightDiv.style.left = '';
    document.getElementById('left-p').innerText = 'У меня есть';
    document.getElementById('right-p').innerText = 'Хочу приобрести';
    arrowButton.removeEventListener('click', reverseToggle);
    arrowButton.addEventListener('click', toggle);
}

function cleaner(input) {
    let dirty = input;
    let clean = '';
    let isFirstDot = true;
    for (let i = 0; i < dirty.length; i++) {
        if (isFirstDot && (dirty[i] === '.' || dirty[i] === ',')) {
            clean += dirty[i];
            isFirstDot = false;
        }
        if (!isNaN(dirty[i])) {
            clean += dirty[i];
        }
    }
    return clean.replace(',', '.');
}