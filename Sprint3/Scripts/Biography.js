//The following script will make changes in the navbar of the shows webpage
let bioButton = document.querySelector(".navbar__menu__bio");
bioButton.style.borderBottom = "solid 3px white";
bioButton.style.color = "white";
//Below the array with all the existing comments is created
// function below builds the comment list
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
// The function below builds the list of commentaries on the page
function buildComList(){
    for (let i = 0; i < comlist.length; i++){
        console.log(i);
        let block = document.querySelector(".commentsec__existing__one");
        let newblock = block.cloneNode(true);
        newblock.querySelector(".commentsec__existing__one__comment__header--name").innerHTML = comlist[i].name;
        newblock.querySelector(".commentsec__existing__one__comment__header--date").innerHTML = comlist[i].date;
        newblock.querySelector(".commentsec__existing__one__comment__body").innerHTML = comlist[i].comment;
        newblock.querySelector(".commentsec__existing__one__comment__body").overflowWrap = "break-word";
        newblock.style.display = block;
        // newblock.querySelector(".commentsec__existing__one__image").style.backgroundImage = `${comlist[i].image}`;
        // newblock.querySelector(".commentsec__existing__one__image").style.backgroundPosition = "center";
        // newblock.querySelector(".commentsec__existing__one__image").style.backgroundSize = "cover";
        document.querySelector(".commentsec__existing").prepend(newblock);
    }
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
            comlist.unshift(newcomobj);
        }
        buildComList();
    })
    console.log(comlist);
}

getComments();



// function below adds a new comment to the array, clears the comments list and rebuilds it again with a new updated array.
function displayComment(event) {
    event.preventDefault();
    let newcomment = document.getElementById("comment").value;
    let newname = document.getElementById("name").value;
    let newcomobj = {
        name: newname,
        comment: newcomment,
    }
    axios.post (`https://project-1-api.herokuapp.com/comments?api_key=${ApiKey}`, {
        name: newname,
        comment: newcomment
        })
    .then (response => {
        let comListObjs = document.querySelector(".commentsec__existing");
        while (comListObjs.firstChild) { 
            comListObjs.removeChild(comListObjs.firstChild);
        }
        getComments();
        buildComList();
        
    })
    // Code below removes all the nodes from the comment list
    
    
    
}
//The following code adds a function to the click of the comment button
var commentForm = document.querySelector(".commentsec__inputsec__form");
commentForm.addEventListener("submit", displayComment);

/////////////////
axios.get(`https://project-1-api.herokuapp.com/comments?api_key=${ApiKey}`)
    .then (response => {
        console.log(response.data);
    })

// axios.delete(`https://project-1-api.herokuapp.com/comments/53bd6496-815d-4320-aeb3-d57899de747a?api_key=${ApiKey}`, {})
//     .then (response => {
//         console.log(response.data);
//     })




