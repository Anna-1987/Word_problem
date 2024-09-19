const inputText = document.getElementById('inputText');
const applyButton = document.getElementById('applyButton');
const outputArea = document.getElementById('outputArea');

let selectedChars = []; // Массив виділених символів
let isCtrlPressed = false;
let draggingElement = null;
let offsetX = 0, offsetY = 0;

applyButton.addEventListener('click', () => {
    outputArea.innerHTML = ''; // Очищаємо попередній контент
    const text = inputText.value;

    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.classList.add('char');
        span.setAttribute('draggable', 'false');
        span.addEventListener('click', handleCharClick);
        span.addEventListener('mousedown', handleMouseDown);
        outputArea.appendChild(span);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Control') {
        isCtrlPressed = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Control') {
        isCtrlPressed = false;
    }
});

function handleCharClick(e) {
    if (isCtrlPressed) {
        e.target.classList.toggle('selected');
        toggleCharSelection(e.target);
    }
}

function toggleCharSelection(char) {
    const index = selectedChars.indexOf(char);
    if (index > -1) {
        selectedChars.splice(index, 1);
    } else {
        selectedChars.push(char);
    }
}

function handleMouseDown(e) {
    if (selectedChars.length === 0) {
        selectedChars.push(e.target); // Якщо не виділено, переміщуємо цей символ
    }

    draggingElement = selectedChars;

    const rect = e.target.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

function handleMouseMove(e) {
    draggingElement.forEach(el => {
        el.classList.add('dragging');
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
    });
}

function handleMouseUp(e) {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    draggingElement.forEach(el => {
        el.classList.remove('dragging');
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
    });

    draggingElement = null;
}
