console.log('Welcome');

showNotes();


// if user adds a note, add it local storage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addText = document.getElementById('addText');
    let addTitle = document.getElementById('addTitle');

    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let textValue = addText.value;
    let titleValue = addTitle.value;

    let myObj = {
        title : titleValue,
        text : textValue
    }

    if (textValue == '' && titleValue == '') {
        
        alert("Bhai kya kr raha hai tu.");
    }
    else{
        notesObj.push(myObj);
    }
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addText.value = '';
    addTitle.value = '';

    showNotes();

});


// function to show elements from local storage

function showNotes() {

    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }


    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">

                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>

        `
    });

    let notesElem = document.getElementById('notes');

    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = "<p>Nothing to show! Add a Note to show here.</p>";
    }

}


// function to delete note

function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    notesObj = JSON.parse(notes);

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));

    showNotes();

}


let search = document.getElementById('searchText');

search.addEventListener("input",function() {
    let inputVal = search.value;

    let noteCards = document.getElementsByClassName("noteCard");

    Array.from(noteCards).forEach(function (element) {
        let noteText = element.getElementsByTagName("p")[0].innerText;

        if(noteText.includes(inputVal)){
            element.style.display = "block";

        }
        else{
            element.style.display = "none";
            
        }
    })
    // console.log("Input event fired!");
})

/*
More features to add:
1. Add Title
2. Mark notes as important
3. Seperate notes by user
4. Sync and host to web server
*/

