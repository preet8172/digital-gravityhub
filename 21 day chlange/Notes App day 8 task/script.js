 const notesContainer = document.getElementById("notes");

    // Load saved notes
    window.onload = function () {
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

      savedNotes.forEach(noteText => {
        createNote(noteText);
      });
    };

    function saveNotes() {
      const textareas = document.querySelectorAll(".note textarea");

      const notes = [];

      textareas.forEach(textarea => {
        notes.push(textarea.value);
      });

      localStorage.setItem("notes", JSON.stringify(notes));
    }

    function createNote(text = "") {
      const note = document.createElement("div");
      note.classList.add("note");

      note.innerHTML = `
        <button class="delete-btn">X</button>
        <textarea placeholder="Write your note...">${text}</textarea>
      `;

      // Delete note
      note.querySelector(".delete-btn").addEventListener("click", () => {
        note.remove();
        saveNotes();
      });

      // Save while typing
      note.querySelector("textarea").addEventListener("input", saveNotes);

      notesContainer.appendChild(note);
    }

    function addNote() {
      createNote();
      saveNotes();
    }