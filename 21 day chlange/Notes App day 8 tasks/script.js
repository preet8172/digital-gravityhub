const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes() {
    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        noteDiv.innerHTML = `
            <p>${note}</p>
            <button class="delete-btn" onclick="deleteNote(${index})">
                Delete
            </button>
        `;

        notesContainer.appendChild(noteDiv);
    });
}

function addNote() {
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please enter a note!");
        return;
    }

    notes.push(noteText);
    saveNotes();
    displayNotes();

    noteInput.value = "";
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    displayNotes();
}

displayNotes();