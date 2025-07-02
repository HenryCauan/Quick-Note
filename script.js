const content = document.getElementById("content");
const input = document.getElementById("title");
const inputDescription = document.getElementById("description-note");


document.getElementById('addNoteBtn').addEventListener('click', function () {
    const addNoteContainer = document.querySelector('.addNoteContainer');
    addNoteContainer.style.visibility = 'visible'; // Torna o container visível
});

// Para fechar o container quando o botão "X" for clicado
document.querySelector('.addNoteContainer .header button').addEventListener('click', function () {
    const addNoteContainer = document.querySelector('.addNoteContainer');
    addNoteContainer.style.visibility = 'hidden'; // Oculta o container novamente
});

function saveMode() {

    const card = document.createElement("div");
    card.classList.add("card");

    const titleNotion = document.createElement("div")
    titleNotion.classList.add("title");
    titleNotion.innerText = input.value;

    const descriptionNotion = document.createElement("div")
    descriptionNotion.classList.add("description");
    descriptionNotion.innerText = inputDescription.value;

    const saveNote = document.getElementById("save-note");

    if (input.value.trim() != "" && inputDescription.value.trim() != "") {
        content.appendChild(card);
        card.appendChild(titleNotion);
        card.appendChild(descriptionNotion);
    }
}

document.getElementById("cancel").addEventListener("click", function () {
    const addNoteContainer = document.querySelector('.addNoteContainer');
    addNoteContainer.style.visibility = 'hidden'; // Oculta o container novamente

    input.value = "";
    inputDescription.value = "";
})

