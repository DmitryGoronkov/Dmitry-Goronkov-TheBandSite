const ApiKey = "81024257-317e-4d5f-9cc1-aa2929f25663";
let comlist = [];

//Function below converts a timestamp to date
function timestampConversion(timestamp){
    const timeToConvert = new Date(timestamp);
    const year = timeToConvert.getFullYear();
    let month = timeToConvert.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = timeToConvert.getDay();
    if (day < 10) {
        day = `0${day}`;
    }
    const convertedTime = `${month}/${day}/${year}`;
    return convertedTime;
}

// The function below adds a comment on the page
function displayComment(singleComment){
        const block = document.querySelector(".commentsec__existing__one");
        let newblock = block.cloneNode(true);
        const selector = ".commentsec__existing__one__comment";
        newblock.querySelector(`${selector}__header--name`).innerHTML = singleComment.name;
        newblock.querySelector(`${selector}__header--date`).innerHTML = singleComment.date;
        newblock.querySelector(`${selector}__body`).innerHTML = singleComment.comment;
        newblock.querySelector(`${selector}__body`).overflowWrap = "break-word";
        newblock.style.display = block;
        // newblock.querySelector(".commentsec__existing__one__image").style.backgroundImage = `${comlist[i].image}`;
        // newblock.querySelector(".commentsec__existing__one__image").style.backgroundPosition = "center";
        // newblock.querySelector(".commentsec__existing__one__image").style.backgroundSize = "cover";
        document.querySelector(".commentsec__existing").prepend(newblock);
}

//Function below gets the comments from API
function getComments(){
    axios.get(`https://project-1-api.herokuapp.com/comments?api_key=${ApiKey}`)
    .then (response => {
        for (let i=0; i < response.data.length; i++){
            let newcomment = response.data[i].comment;
            let newname = response.data[i].name;
            let newdate = timestampConversion(response.data[i].timestamp);
            let newcomobj = {
                name: newname,
                comment: newcomment,
                date: newdate
            };
            comlist.push(newcomobj);
        }
        comlist.forEach(comment => {
            displayComment(comment);
        });
    })
}
getComments();

// function below adds a new comment to the array, clears the comments list and rebuilds it again with a new updated array.
function addComment(event) {
    event.preventDefault();
    let newcomment = document.getElementById("comment").value;
    let newname = document.getElementById("name").value;
    axios.post (`https://project-1-api.herokuapp.com/comments?api_key=${ApiKey}`, {
        name: newname,
        comment: newcomment
        })
    .then (response => {
        let comListObjs = document.querySelector(".commentsec__existing");
        while (comListObjs.firstChild) { 
            comListObjs.removeChild(comListObjs.firstChild);
        }
        comlist = [];
        getComments();
    })
}
//The following code adds a function to the click of the comment button
var commentForm = document.querySelector(".commentsec__inputsec__form");
commentForm.addEventListener("submit", addComment);









/////////////////
axios.get(`https://project-1-api.herokuapp.com/comments?api_key=${ApiKey}`)
    .then (response => {
        console.log(response.data);
    })

// axios.delete(`https://project-1-api.herokuapp.com/comments/53decfd7-efc0-47c1-9379-c042da5815ab?api_key=${ApiKey}`, {})
//     .then (response => {
//         console.log(response.data);
// })




