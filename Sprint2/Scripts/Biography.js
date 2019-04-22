//The following script will make changes in the navbar of the shows webpage
let bioButton = document.querySelector(".navbar__menu__bio");
bioButton.style.borderBottom = "solid 3px white";
bioButton.style.color = "white";
//Below the array with all the existing comments is created
let comlist = [];
comlist[2] = {
    name: "Micheal Lyons",
    date: "12/18/2018",
    comment: "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.",
    image: "url('./Assets/Images/Michael.jpg')"
};
comlist[1] = {
    name: "Gary Wong",
    date: "12/12/2018",
    comment: "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
    image: "url('./Assets/Images/Gary.jpg')"
};

comlist[0] = {
    name: "Theodore Duncan",
    date: "11/15/2018",
    comment: "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!",
    image: "url('./Assets/Images/Teo.jpg')"
};
// function below builds the comment list
function buildComList(){
    for (let i = 0; i < comlist.length; i++){
        let block = document.querySelector(".commentsec__existing__one");
        let newblock = block.cloneNode(true);
        newblock.querySelector(".commentsec__existing__one__comment__header--name").innerHTML = comlist[i].name;
        newblock.querySelector(".commentsec__existing__one__comment__header--date").innerHTML = comlist[i].date;
        newblock.querySelector(".commentsec__existing__one__comment__body").innerHTML = comlist[i].comment;
        newblock.querySelector(".commentsec__existing__one__comment__body").overflowWrap = "break-word";
        newblock.style.display = block;
        newblock.querySelector(".commentsec__existing__one__image").style.backgroundImage = `${comlist[i].image}`;
        newblock.querySelector(".commentsec__existing__one__image").style.backgroundPosition = "center";
        newblock.querySelector(".commentsec__existing__one__image").style.backgroundSize = "cover";
        document.querySelector(".commentsec__existing").prepend(newblock);
    }
}
buildComList();
// function below adds a new comment to the array, clears the comments list and rebuilds it again with a new updated array.
function displayComment() {
    event.preventDefault();
    let newcomment = document.getElementById("comment").value;
    let newname = document.getElementById("name").value;
    let newdate = new Date();
    let day = String(newdate.getDate()).padStart(2, '0');
    let month = String(newdate.getMonth() + 1).padStart(2, '0'); 
    let year = newdate.getFullYear();
    newdate = month + '/' + day + '/' + year;
    let newcomobj = {
        name: newname,
        date: newdate,
        comment: newcomment,
        image: "url('./Assets/Images/Mohan-muruge.jpg')"
    };
    comlist.push(newcomobj);
    // Code below removes all the nodes from the comment list
    let comListObjs = document.querySelector(".commentsec__existing");
    while (comListObjs.firstChild) { 
        comListObjs.removeChild(comListObjs.firstChild);
    }
    buildComList();
}
//The following code adds a function to the click of the comment button
var commentForm = document.querySelector(".commentsec__inputsec__form");
commentForm.addEventListener("submit", displayComment);





