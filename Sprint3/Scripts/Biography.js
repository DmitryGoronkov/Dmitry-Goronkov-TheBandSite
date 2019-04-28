const ApiKey = "81024257-317e-4d5f-9cc1-aa2929f25663";
let comList = [];

//Function below converts a timestamp to date
function timestampConversion(timestamp){
    const timeToConvert = new Date(timestamp);
    const year = timeToConvert.getFullYear();
    let month = timeToConvert.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = timeToConvert.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    const convertedTime = `${month}/${day}/${year}`;
    return convertedTime;
}

// The function below adds a comment on the page
function displayComment(singleComment) {
    const block = document.querySelector(".commentsec__existing__one");
    let newblock = block.cloneNode(true);
    const selector = ".commentsec__existing__one__comment";
    newblock.querySelector(`${selector}__header--name`).innerHTML = singleComment.name;
    newblock.querySelector(`${selector}__header--date`).innerHTML = singleComment.date;
    // The code below add images to different users
    const photoSelector = ".commentsec__existing__one__image";
    function imageAdd(url) {
        newblock.querySelector(`${photoSelector}`).style.backgroundImage = `${url}`;
        newblock.querySelector(`${photoSelector}`).style.backgroundPosition = "center";
        newblock.querySelector(`${photoSelector}`).style.backgroundSize = "cover";
    }
    if (singleComment.photo) {
        imageAdd(`url("./Assets/Images/Mohan-muruge.jpg")`);
        newblock.querySelector(`.commentsec__existing__one__comment__button`).style.display = "block";
    }
    if (singleComment.name === "Micheal Lyons") {
        imageAdd(`url("./Assets/Images/Michael.jpg")`);
    }
    if (singleComment.name === "Gary Wong") {
        imageAdd(`url("./Assets/Images/Gary.jpg")`);
    }
    if (singleComment.name === "Theodore Duncan") {
        imageAdd(`url("./Assets/Images/Teo.jpg")`);
    }
    newblock.querySelector(`${selector}__body`).innerHTML = singleComment.comment;
    newblock.querySelector(`${selector}__body`).overflowWrap = "break-word";
    newblock.querySelector(`.commentsec__existing__one__comment__button`).id = singleComment.id;
    document.querySelector(".commentsec__existing").prepend(newblock);
}

//Function below gets the comments from API
function getComments(){
    axios.get(`https://project-1-api.herokuapp.com/comments?api_key=${ApiKey}`)
    .then (response => {
        for (let i=0; i < response.data.length; i++){
            let newComment = response.data[i].comment;
            let newName = response.data[i].name;
            let newDate = timestampConversion(response.data[i].timestamp);
            let id = response.data[i].id;
            let newComObj = {
                name: newName,
                comment: newComment,
                date: newDate,
                id: id
            };
            // The conditional statement below will just add a visual feature of having Mohan's photo added to every new comment. Approved by Ed Jackson :)
            if (response.data[i].timestamp > 1556396118896){
                newComObj.photo = true;
            } else {newComObj.photo = false}

            comList.push(newComObj);
        }
        comList.forEach(comment => {
            displayComment(comment);
        });
        deleteAndGet();
    })
    .catch(error => {
        console.log("Could not connect to the server to get the comment data");
    });
}
getComments();

///// delete comment function. Delete button is added only to new posted comments 
function deleteAndGet() {
    comList.forEach(comment => {
        function deleteComment (){
            axios.delete(`https://project-1-api.herokuapp.com/comments/${comment.id}?api_key=${ApiKey}`, {})
            .then (response => {
                let comListObjs = document.querySelector(".commentsec__existing");
                while (comListObjs.firstChild) { 
                    comListObjs.removeChild(comListObjs.firstChild);
                }
                comList = [];
                getComments();
            })
            .catch(error => {
                console.log("Could not connect to the server to delete the comment data");
            });
        }
        document.getElementById(`${comment.id}`).addEventListener("click", deleteComment);
    });
}


// function below adds a new comment to the array, clears the comments list and rebuilds it again with a new updated array.

function addComment(event) {
    event.preventDefault();
    let newComment = document.getElementById("comment").value;
    let newName = document.getElementById("name").value;
    axios.post (`https://project-1-api.herokuapp.com/comments?api_key=${ApiKey}`, {
        name: newName,
        comment: newComment
        })
    .then (response => {
        let comListObjs = document.querySelector(".commentsec__existing");
        while (comListObjs.firstChild) { 
            comListObjs.removeChild(comListObjs.firstChild);
        }
        comList = [];
        
        getComments();
        
    })
    .catch(error => {
        console.log("Could not connect to the server to post the comment data");
    });
}

//The following code adds a function to the click of the comment button
var commentForm = document.querySelector(".commentsec__inputsec__form");
commentForm.addEventListener("submit", addComment);
