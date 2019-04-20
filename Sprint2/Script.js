// var commentForm = document.querySelector('.commentsec__inputsec__form');

// commentForm.addEventListener('submit',event => { 
//     event.preventDefault();
//     var comment = event.target.comment.value;
//     console.log(comment);
//     var block = document.querySelector(".commentsec__existing__one");
//     var newblock = block.cloneNode(true);
//     console.log(newblock);
//     document.querySelector("commentsec__existing").appendChild(newblock);
// })
var comlist = [];
comlist[2] = {
    name: "Micheal Lyons",
    date: "12/18/2018",
    comment: "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed."
};

comlist[1] = {
    name: "Gary Wong",
    date: "12/12/2018",
    comment: "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!"
};

comlist[0] = {
    name: "Theodore Duncan",
    date: "11/15/2018",
    comment: "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!"
};
// function below builds the comment list
function buildComList(){
    for (var i = 0; i < comlist.length; i++){
        var block = document.querySelector(".commentsec__existing__one");
        var newblock = block.cloneNode(true);
        newblock.querySelector(".commentsec__existing__one__comment__header--name").innerHTML = comlist[i].name;
        newblock.querySelector(".commentsec__existing__one__comment__header--date").innerHTML = comlist[i].date;
        newblock.querySelector(".commentsec__existing__one__comment__body").innerHTML = comlist[i].comment;
        newblock.style.display = block;
        document.querySelector(".commentsec__existing").prepend(newblock);
    }
}
buildComList();
// function below adds a new comment to the array, clears the comments list and rebuilds it again with a new array.
function displayComment() {
    event.preventDefault();
    var newcomment = document.getElementById("comment").value;
    var newname = document.getElementById("name").value;
    var newdate = new Date();
    var dd = String(newdate.getDate()).padStart(2, '0');
    var mm = String(newdate.getMonth() + 1).padStart(2, '0'); 
    var yyyy = newdate.getFullYear();
    newdate = mm + '/' + dd + '/' + yyyy;
    var newcomment = {
        name: newname,
        date: newdate,
        comment: newcomment
    };
    comlist.push(newcomment);
    console.log(comlist);
    // Code below removes all the nodes from the comment list
    while (document.querySelector(".commentsec__existing").firstChild) { 
        document.querySelector(".commentsec__existing").removeChild(document.querySelector(".commentsec__existing").firstChild);
    }
    buildComList();
    
}