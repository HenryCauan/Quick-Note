// Referências
const content = document.getElementById("content");
const input = document.getElementById("title");
const inputDescription = document.getElementById("description-note");
let cardNotes = [];

// Abrir modal
document.getElementById('addNoteBtn').addEventListener('click', function () {
    document.querySelector('.addNoteContainer').style.visibility = 'visible';
});

// Cancelar
document.getElementById("cancel").addEventListener("click", function () {
    document.querySelector('.addNoteContainer').style.visibility = 'hidden';
    input.value = "";
    inputDescription.value = "";
});

document.getElementById("closed").addEventListener("click", function () {
    document.querySelector('.addNoteContainer').style.visibility = 'hidden';
    input.value = "";
    inputDescription.value = "";
})

// Salvar novo card
function saveMode() {
    const saveNote = document.getElementById("save-note");

    saveNote.onclick = function () {
        if (input.value.trim() !== "" && inputDescription.value.trim() !== "") {
            const newCard = {
                id: Date.now(),
                title: input.value,
                description: inputDescription.value
            };

            cardNotes.push(newCard);
            localStorage.setItem("cardNotes", JSON.stringify(cardNotes));
            renderCard(newCard);

            input.value = "";
            inputDescription.value = "";
            document.querySelector('.addNoteContainer').style.visibility = 'hidden';
        }
    };
}

// Renderizar card individual
function renderCard(note) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", note.id);

    const titleNotion = document.createElement("div");
    titleNotion.classList.add("title");
    titleNotion.innerText = note.title;

    const descriptionNotion = document.createElement("div");
    descriptionNotion.classList.add("description");
    descriptionNotion.innerText = note.description;

    const cardActions = document.createElement("div");
    cardActions.classList.add("option");

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerHTML = '<i class="ri-pencil-line"></i>';
    editButton.addEventListener("click", function () {
        const addNoteContainer = document.querySelector('.addNoteContainer');
        addNoteContainer.style.visibility = 'visible';
        input.value = note.title;
        inputDescription.value = note.description;

        const saveNote = document.getElementById("save-note");
        saveNote.onclick = function () {
            if (input.value.trim() !== "" && inputDescription.value.trim() !== "") {
                const cardIndex = cardNotes.findIndex(n => n.id === note.id);
                if (cardIndex !== -1) {
                    cardNotes[cardIndex].title = input.value;
                    cardNotes[cardIndex].description = inputDescription.value;
                    localStorage.setItem("cardNotes", JSON.stringify(cardNotes));

                    titleNotion.innerText = input.value;
                    descriptionNotion.innerText = inputDescription.value;

                    addNoteContainer.style.visibility = 'hidden';
                    input.value = "";
                    inputDescription.value = "";

                    saveMode();
                }
            }
        };
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<i class="ri-delete-bin-7-line"></i>';
    deleteButton.addEventListener("click", function () {
        const cardIndex = cardNotes.findIndex(n => n.id === note.id);
        if (cardIndex !== -1) {
            cardNotes.splice(cardIndex, 1);
            localStorage.setItem("cardNotes", JSON.stringify(cardNotes));
            card.remove();
        }
    });

    cardActions.appendChild(editButton);
    cardActions.appendChild(deleteButton);
    card.appendChild(cardActions);
    card.appendChild(titleNotion);
    card.appendChild(descriptionNotion);
    content.appendChild(card);
}

// Carregar cards salvos ao abrir a página
document.addEventListener("DOMContentLoaded", function () {
    const savedNotes = localStorage.getItem("cardNotes");
    if (savedNotes) {
        cardNotes = JSON.parse(savedNotes);
        cardNotes.forEach(note => renderCard(note));
    }
});

function changeColors() {
    const body = document.body;
    const container = document.querySelector('.container');
    const navbar = document.querySelector('.navbar');
    const cards = document.querySelectorAll('.card');
    const content = document.querySelector('.content');
    const closed = document.getElementById("closed")
    const toggleButton = document.querySelector('.toogleColor');
    const textElements = document.querySelectorAll('h1, h3, p, .title, .description, .card-note .title p, .card-note .description p');
    const cardActionButtons = document.querySelectorAll('.option button');
    const addNoteContainer = document.querySelector('.addNoteContainer');
    const cardNote = document.querySelector('.card-note');
    const modalInputs = document.querySelectorAll('.card-note input, .card-note textarea');
    const modalTexts = document.querySelectorAll('.card-note h3, .card-note p');

    // Verifica se o tema atual é claro (padrão)
    const isLightTheme = body.style.backgroundColor !== 'rgb(26, 28, 34)';

    if (isLightTheme) {
        // Aplica o tema escuro
        body.style.backgroundColor = '#1a1c22';
        container.style.backgroundColor = '#1a1c22';
        navbar.style.backgroundColor = '#1a1c22';
                    closed.style.color = "#ffffff"
        content.style.backgroundColor = '#1a1c22';
        toggleButton.textContent = '☀️'; // Muda o ícone para sol

        // Aplica cores aos cards e textos
        cards.forEach(card => {
            card.style.backgroundColor = '#2b2f37';
            card.style.color = '#ffffff';
        });

        // Muda todos os textos para branco
        textElements.forEach(element => {
            element.style.color = '#ffffff';
        });

        // Muda os botões de ação para branco
        cardActionButtons.forEach(button => {
            button.style.color = '#ffffff';
        });

        // Aplica o tema escuro ao modal
        if (cardNote) {
            cardNote.style.backgroundColor = '#2b2f37';
            cardNote.style.color = '#ffffff';
        }

        // Aplica cores aos inputs e textarea do modal
        modalInputs.forEach(input => {
            input.style.backgroundColor = '#1e1f26';
            input.style.color = '#ffffff';
            input.style.border = '1px solid #1e1f26';
        });

        // Aplica cor branca aos textos do modal
        modalTexts.forEach(text => {
            text.style.color = '#ffffff';
        });

    } else {
        // Volta ao tema claro (padrão)
        closed.style.color = "black"
        body.style.backgroundColor = '';
        container.style.backgroundColor = '';
        navbar.style.backgroundColor = 'white';
        content.style.backgroundColor = '#f2f3f8';
        toggleButton.textContent = '🌙'; // Muda o ícone para lua

        // Volta às cores originais dos cards e textos
        cards.forEach(card => {
            card.style.backgroundColor = 'white';
            card.style.color = '';
        });

        // Remove a cor branca dos textos
        textElements.forEach(element => {
            element.style.color = '';
        });

        // Remove a cor branca dos botões de ação
        cardActionButtons.forEach(button => {
            button.style.color = '';
        });

        // Volta ao tema claro no modal
        if (cardNote) {
            cardNote.style.backgroundColor = 'white';
            cardNote.style.color = '';
        }

        // Volta às cores originais dos inputs e textarea do modal
        modalInputs.forEach(input => {
            input.style.backgroundColor = '';
            input.style.color = '';
            input.style.border = '';
        });

        // Volta às cores originais dos textos do modal
        modalTexts.forEach(text => {
            text.style.color = '';
        });
    }
}