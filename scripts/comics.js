let allCards=[];
let allTags=[];


function fetchJSONData() {
    fetch('https://tessamitchell.github.io/data/comicsprojects.json')
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
fetchJSONData();

let sortdesc = document.getElementById("sort");
sortdesc.addEventListener("change",sortby);



function createCard(project){

    let codeCard=document.createElement("div");
    codeCard.className="code-card";


    const col1=document.createElement("div")
    col1.className="code-image";

    codeCard.append(col1);


    const col2=document.createElement("div");
    col2.className="code-info";
    codeCard.append(col2);
    
    const image=document.createElement("img");
    image.setAttribute("src",project.thumbnail);
    col1.append(image);
    
    const title=document.createElement("div");
    title.className="title";
    col2.append(title);

    const titletext=document.createElement("h2");
    titletext.textContent=project.name;
    titletext.id="titletext";
    title.append(titletext);

    const date= document.createElement("small");
    // date.textContent= String(project.date.getUTCMonth()+1)+"-"+String(project.date.getUTCDate())+"-"+String(project.date.getUTCFullYear());
    date.textContent=project.date;
    date.id="date";
    title.append(date);

    if(project.brief != null){
    const brief = document.createElement("p");
    brief.textContent="Brief: " + project.brief;
    col2.append(brief);
    }

    if(project.description != null && project.description != ""){
        const description=document.createElement("p");
        description.textContent="Description: " + project.description;
        col2.append(description);
    }
    
    const tags=document.createElement("div");
    tags.className="code-tags";
    
    for(let i=0;i<project.tags.length;i++){
        const tag=document.createElement("button");
        tag.textContent=project.tags[i];
        tag.className="tag-button";
        
        tag.style.marginRight=String(40/project.tags.length)+"%";
        
        tag.onclick=() => filterbytag(project.tags[i]);

        tags.append(tag);

        if(!allTags.includes(project.tags[i])){
            allTags.push(project.tags[i]);
        }

    }
    col2.append(tags);

    const modal = document.createAttribute("div");
    modal.className="comics-modal";
    codeCard.append(modal);

    const x = document.createAttribute("span");
    x.className="close"
    x.innerHTML="&times;"
    modal.append(x)

    for (let i=0;i<project.images.length;i++){
        const newImage = document.createElement('img');
        newImage.src = project.images[i];

        modal.append(newImage);
    }

    image.onclick = function(){
        modal.style.display = "block";
    }
    x.onclick = function() {
        modal.style.display = "none";
    }

    document.getElementById("code-cards-container").append(codeCard);

    allCards.push(codeCard);
}

function addTags(){
    let filtertags=document.getElementById("filter-tags");
    for(let i=0;i<allTags.length;i++){
        const tag=document.createElement("button");
        tag.textContent=allTags[i];
        tag.className="tag-filter";
        
        tag.style.marginRight=String(30/allTags.length)+"%";
        
        tag.onclick=() => filterbytag(allTags[i]);

        const x = document.createElement("span");
        x.textContent=" \u00D7 ";
        x.id="x";
        x.click=()=>removefilters();
        x.style.display="none";
        x.style.fontWeight="bold";
        tag.append(x);

        filtertags.append(tag);
    }

}




function sortby(){
    let sender=document.getElementById("sort");
    let container=document.getElementById("code-cards-container");
    if(sender.value=="name"){
        allCards.sort((a,b) => a.querySelector("#titletext").textContent.localeCompare(b.querySelector("#titletext").textContent));
    }
    else if(sender.value=="date up"){
        allCards.sort((a,b) => new Date(a.querySelector("#date").textContent) - new Date(b.querySelector("#date").textContent));
    }
    else{
        allCards.sort((a,b) => new Date(b.querySelector("#date").textContent) - new Date(a.querySelector("#date").textContent));
        
    }
    // clear cards from screen
    container.innerHTML = "";

    allCards.forEach(card => container.append(card));
    
    
    return;
}


function filterbytag(tag){
    for(let i=0;i<allCards.length;i++){
           
        let tagButtons = allCards[i].querySelectorAll(".tag-button");
        
        if(Array.from(tagButtons).some(btn => btn.textContent === tag)){
            allCards[i].style.display = "";
        }
        else{

            allCards[i].style.display = "none";
        }
        
    }
    
    let allFilters=document.getElementById("filter-tags").querySelectorAll(".tag-filter");;
    allFilters.forEach(filter=>{
        if(filter.textContent.includes(tag)){
            filter.style.backgroundColor = "#aeafe7";
            filter.style.fontWeight = "bold";
            filter.querySelector("#x").display="";
        }
        else{
            filter.style.backgroundColor = "#626280";
            filter.style.fontWeight = "normal";
            filter.querySelector("#x").display="none";
        }
        
        
    })
    document.getElementById("clear-btn").disabled=false;

}

function removefilters(){
    for(let i=0;i<allCards.length;i++){
        
        allCards[i].style.display="";
        
    }
    let allFilters=document.getElementById("filter-tags").querySelectorAll(".tag-filter");;
    allFilters.forEach(filter=>{
        filter.style.backgroundColor="#aeafe7" ;
        filter.style.fontWeight="normal" ;
        filter.querySelector("#x").display="none";
    })

    document.getElementById("clear-btn").disabled=true;
}





// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the image and insert it inside the modal - use its "alt" text as a caption
// var img =document.getElementById("comicImg");
// // var imgs = document.getElementsByClassName("comicImgs");

// var pages= ["https://tessamitchell.github.io/images/comics/hedypage1.png","https://tessamitchell.github.io/images/comics/hedypage2.png"];
// var modalImg = document.getElementById("m-scontent");
// var captionText = document.getElementById("caption");

// for (let i=0;i<pages.length;i++){
//             const newImage = document.createElement('img');

// // Set the source of the image
//             newImage.src = pages[i];
//             newImage.style.width = "90%";

// // Optionally, set an alt attribute for accessibility
//             newImage.alt = 'Description of the image';

//             modal.append(newImage);
// }

// img.onclick = function(){
//   modal.style.display = "block";
// //   modalImg.src = this.src;

    


//   captionText.innerHTML = this.alt;
// }

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on <span> (x), close the modal
