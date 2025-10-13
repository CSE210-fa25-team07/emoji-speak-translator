const ta = document.getElementById('inputText');
const te = document.getElementById('inputEmoji');
const leftPanel = document.getElementById('leftPanel');
const rightPanel = document.getElementById('rightPanel');
const labelLeft = document.getElementById('labelLeft');
const labelRight = document.getElementById('labelRight');

ta.value = '';
let reversed = false;

function updatePlaceholderState(){
    let activeInput = !reversed ? ta : te;
    let activeOutput = !reversed? te : ta;
    let activePanel = !reversed ? leftPanel : rightPanel;
    
    if (activeInput.value.trim().length > 0) {
        activePanel.classList.add('has-content');
    } 
    else {
        activePanel.classList.remove('has-content');
    }

    const inputText = activeInput.value;

    let outputText;
    if (!reversed) {
        outputText = translate(inputText, 'toEmoji');

    }
    else {
        outputText = translate(inputText, 'toWord');
    }

    activeOutput.value = outputText;
}

function addFocus() {
    let activePanel = !reversed ? leftPanel : rightPanel;
    activePanel.classList.add('focused');
}

function removeFocus() {
    let activePanel = !reversed ? leftPanel : rightPanel;
    activePanel.classList.remove('focused');
}

// ta.addEventListener('focus', addFocus);
// te.addEventListener('focus', addFocus);
// ta.addEventListener('blur', removeFocus);
// te.addEventListener('blur', removeFocus);

ta.addEventListener('input', updatePlaceholderState);
te.addEventListener('input', updatePlaceholderState);
updatePlaceholderState();

const reverseBtn = document.querySelector('.reverse');
reverseBtn.addEventListener('click', () => {
    // swap DOM order to visually reverse sides
    const parent = document.querySelector('.panels');
    reversed = !reversed;

    ta.readOnly = reversed;
    te.readOnly = !reversed;

    if (parent.firstElementChild === leftPanel) {
        parent.insertBefore(rightPanel, leftPanel);
        labelLeft.textContent = "Emoji";
        labelRight.textContent = "Text";
        rightPanel.classList.remove('inactive');
        leftPanel.classList.add('inactive');
    } else {
        parent.insertBefore(leftPanel, rightPanel);
        labelLeft.textContent = "Text";
        labelRight.textContent = "Emoji";
        leftPanel.classList.remove('inactive');
        rightPanel.classList.add('inactive');
    }
    updatePlaceholderState();
});