const ApiKey = "81024257-317e-4d5f-9cc1-aa2929f25663";
let showList = [];


function displayShows(singleShow){
    const block = document.querySelector(".main__tickets__section");
    let newblock = block.cloneNode(true);
    const selector = ".main__tickets__section";
    newblock.querySelector(`${selector}__date`).innerHTML = singleShow.date;
    newblock.querySelector(`${selector}__venue`).innerHTML = singleShow.place;
    newblock.querySelector(`${selector}__loc`).innerHTML = singleShow.location;
    document.querySelector(".main__tickets").appendChild(newblock);
}

axios.get(`https://project-1-api.herokuapp.com/showdates?api_key=${ApiKey}`)
    .then (response => {
        for (let i=0; i < response.data.length; i++){
            let newDate = response.data[i].date;
            let newPlace = response.data[i].place;
            let newLocation = response.data[i].location;
            let newComObj = {
                date: newDate,
                place: newPlace,
                location: newLocation
            };
            showList.push(newComObj);
        }
        showList.forEach(show =>{
            displayShows(show)
        });
    });


