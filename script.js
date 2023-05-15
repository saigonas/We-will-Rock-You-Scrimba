// Initialize app and import functions from Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//Connect to Firebase database
const appSettings = {
    databaseURL: "https://endorsement-6616d-default-rtdb.europe-west1.firebasedatabase.app/"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);

//Create a reference in the DB
const endorsementDB = ref(database,"endorsements");

//Publish function
const inputFieldEl = document.getElementById("endorsementText");
const submitButtonEl= document.getElementById("endorsementSubmit");

submitButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value;
    push(endorsementDB, inputValue)
})

// Render endorsement text to endorsementarea
const endorsementListEl = document.getElementById("endorsementList")

// Listen for changes in the database
onValue(endorsementDB, (snapshot) => {
    // Clear the list first
    endorsementListEl.innerHTML = '';

    // Get the data from the snapshot
    const data = snapshot.val();

    // Iterate over each endorsement in the data
    for(let id in data) {
        // Create a new list item for each endorsement
        let listItem = document.createElement("li");

        // Set the text of the list item to the endorsement
        listItem.textContent = data[id];

        // Append the list item to the list
        endorsementListEl.appendChild(listItem);
    }
});