const addBtns = document.querySelector("#addBtn");
const main = document.querySelector("#main");



// Create a new function using save Notes

const saveNotes = () => {
    const notes = document.querySelectorAll(".notes textarea");
    const data = [];
    notes.forEach((note) => { data.push(note.value) })
    localStorage.setItem("notes", JSON.stringify(data));


    if (data.length == 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
}



// ye function add karega notes ko

addBtns.addEventListener("click", function () {
    addNote();
});





const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("notes");
    note.innerHTML = `
    <div class="tools">
    <i class="trash fa-solid fa-trash"></i>
    <i class="save fa-sharp fa-solid fa-floppy-disk"></i>
    </div>
    <textarea>${text}</textarea>
    `;
    note.style.borderRadius = "10px"

    note.querySelector(".trash").addEventListener("click",
        function () {
            note.remove();
            saveNotes();
        }
    )

    note.querySelector(".save").addEventListener(
        "click",
        function () {
            saveNotes();
        }
    )

    note.querySelector("textarea").addEventListener(
        "focusout",
        function () {
            saveNotes();
        }
    )

    main.appendChild(note);
    saveNotes();



};


// create selfcalling function reload page then start a function
(
    function () {

        const lsnotes = JSON.parse(localStorage.getItem("notes"));
        // console.log(notes);


        if (lsnotes.length === null) {
            addNote();
        } else {
            lsnotes.forEach((lsNote) => {
                addNote(lsNote);
            })
        }

    }

)();
