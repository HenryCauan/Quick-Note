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
