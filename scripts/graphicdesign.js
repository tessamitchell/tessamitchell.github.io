let allCards=[];
let allTags=[];


function fetchJSONData() {
    fetch('https://tessamitchell.github.io/data/filmprojects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  
        })
        .then(data => {
            console.log(data);

            // convert dates to Dates (better sorting)
            // data.forEach(project => {
            //     project.date = new Date(project.date);
            // });

            // Sort and create cards
            data.sort((a, b) =>  new Date(b.date) - new Date(a.date)); // sort by most recent

            data.forEach(project => createCard(project));
            addTags();
        })  
        .catch(error => console.error('Failed to fetch data:', error)); 
}
//fetchJSONData();

function createCard(project){
    
    let codeCard=document.createElement("div");
    codeCard.className="design-card";
    
    return;
}



function expand(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Get the image text
    // var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    // imgText.innerHTML = imgs.alt;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }