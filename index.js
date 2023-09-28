let light_dark = document.getElementById('light_dark');
let icon = document.getElementById('moon_img');
let navbar = document.querySelector('nav');
let textarea = document.querySelector('textarea');
let change_logo_color = document.querySelectorAll('.change_logo_color');

let words = document.getElementById('words');
let characters = document.getElementById('characters');
let mints = document.getElementById('mints');
let left_words = document.getElementById('left_words');
let preview = document.getElementById('preview');

let buttons = document.querySelectorAll('.buttons');


light_dark.addEventListener('click', () => {
    document.body.classList.toggle('dark_theme');
    navbar.classList.toggle('common_theme');
    textarea.classList.toggle('common_theme');

    change_logo_color.forEach((item) => {
        item.classList.toggle('logo_color');
    });

    if (document.body.classList.contains('dark_theme') && navbar.classList.contains('common_theme')) {
        icon.src = './sun.png';
        localStorage.setItem('theme', 'sun');
    } else {
        icon.src = './moon.png';
        localStorage.setItem('theme', 'moon');
    }

});

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'sun') {
        icon.src = './sun.png';
        document.body.classList.add('dark_theme');
        navbar.classList.add('common_theme');
        textarea.classList.add('common_theme');
        change_logo_color.forEach((item) => {
            item.classList.toggle('logo_color');
        });
    } else {
        icon.src = './moon.png';
        document.body.classList.remove('dark_theme');
        navbar.classList.remove('common_theme');
        textarea.classList.remove('common_theme');
    }
});





textarea.addEventListener('input', () => {
    let textareaVal = textarea.value;

    words.innerHTML = textarea.value === '' ? 0 : textareaVal.split(' ').filter((e) => e.length !== 0).length;

    characters.innerHTML = textareaVal.length;

    mints.innerHTML = textarea.value === '' ? 0 : 0.008 * textareaVal.split(' ').filter((e) => e.length !== 0).length;

    if (textarea.value === '') {
        preview.innerHTML = 'Enter Something to preview';
    } else {
        preview.innerHTML = textareaVal;
    }

    wordsLimitation();
    toggleButtons();

});


function toggleButtons() {
    buttons.forEach((button) => {
        if (textarea.value === '' && textarea.value.length === 0) {
            button.disabled = true;
            button.classList.add('buttons_bgColor_disabled');
        } else {
            button.disabled = false;
            button.classList.add('buttons_bgColor_enabled');
            button.classList.remove('buttons_bgColor_disabled');
        }
    });
}
toggleButtons();




const wordsLimitation = () => {
    let limit = 10000000;
    if (left_words.innerHTML = limit - textarea.value.length + ' ' + 'left') {
        textarea.value = textarea.value.slice(0, limit);
    };
};

const UpperCase = () => {
    textarea.value = textarea.value.toUpperCase();
};

const LowerCase = () => {
    textarea.value = textarea.value.toLowerCase();
};

const SentenceCase = () => {
    textarea.value = textarea.value.charAt(0).toUpperCase() + textarea.value.slice(1).toLowerCase();
};

const CapitalizeCase = () => {

    textarea.value = textarea.value.split(' ').map((word) => (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())).join(' ')

};

const inverseCase = () => {
    textarea.value = textarea.value.split(' ').map((word) => (word.charAt(0).toLowerCase() + word.slice(1).toUpperCase())).join(' ');
};

const AlternatingCase = () => {

    let newText = "";
    let textareaVal = textarea.value;

    for (let i = 0; i < textareaVal.length; i++) {

        if (i % 2 === 0) {
            newText += textareaVal[i].toLowerCase()
        } else {
            newText += textareaVal[i].toUpperCase();
        }

    }

    textarea.value = newText;

};

const reverseWords = () => {
    // textarea.value = textarea.value.split('').reverse().join('');
    let textareaVal = textarea.value;
    let newText = ''
    for (let i = textareaVal.length - 1; i >= 0; i--) {
        newText += textareaVal[i];
    }

    textarea.value = newText
};

const reverseText = () => {
    textarea.value = textarea.value.split(' ').reverse().join(' ');
};

const CopyText = () => {
    textarea.select();
    navigator.clipboard.writeText(textarea.value);
};

const ClearText = () => {
    textarea.value = '';
    words.innerHTML = 0
    characters.innerHTML = 0;
    mints.innerHTML = 0
    preview.innerHTML = 'Enter Something to preview';

    let limit = 10000000;
    left_words.innerHTML = limit
};

const DownloadText = () => {

    // let a = document.createElement('a');
    // a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(textarea.value);
    // a.download = 'text-formatter.txt';
    // a.click();

    let a = document.createElement('a');
    let blob = new Blob([textarea.value], { type: 'text/plain' });
    let blobData = URL.createObjectURL(blob);
    a.href = blobData;
    a.download = 'text-formatter.txt';
    a.click();

};

const SelectAllText = () => {
    textarea.select();
};

const ExtraSpaces = () => {
    textarea.value = textarea.value.trim();
    characters.innerHTML = textarea.value.length;
};

const RemoveSpaces = () => {
    textarea.value = textarea.value.split(' ').join('');
    characters.innerHTML = textarea.value.length;
};

const JoinSpaces = () => {
    textarea.value = textarea.value.split('').join(' ');
    characters.innerHTML = textarea.value.length;
};

const textToSpeech = () => {
    let speech = new SpeechSynthesisUtterance()
    let textareaVal = textarea.value;
    speech.lang = 'eng';
    speech.text = textareaVal;
    window.speechSynthesis.speak(speech);
};