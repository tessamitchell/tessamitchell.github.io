
let allCards=[];
let allTags=[];


function fetchJSONData() {
    fetch('https://tessamitchell.github.io/data/codeprojects.json')
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

    

    const table=document.createElement("table");
    codeCard.append(table);

    const row1=document.createElement("tr");
    table.append(row1);

    const col1=document.createElement("th")
    col1.className="code-image";

    row1.append(col1);

    if(project.video !=null){
        const video= project.video.includes("youtu") ? document.createElement("iframe"):document.createElement("video");
        video.src=project.video;
        video.allowFullscreen=true;
        col1.append(video);
    }else{
        const image=document.createElement("img");
        image.setAttribute("src",project.image);
        col1.append(image);
    }
    

    const col2=document.createElement("th");
    col2.className="code-info";
    row1.append(col2);


    // const table=document.createElement("div");
    // table.className="codecontainer";
    // codeCard.append(table);

    // // const row1=document.createElement("tr");
    // // table.append(row1);

    // const col1=document.createElement("div")
    // col1.className="code-image";

    // table.append(col1);

    // const image=document.createElement("img");
    // image.setAttribute("src",project.image);
    // col1.append(image);

    // const col2=document.createElement("div");
    // col2.className="code-info";
    // table.append(col2);





    const title=document.createElement("div");
    title.className="title";
    col2.append(title);

    const titletext=document.createElement("h2");
    titletext.textContent=project.name;
    titletext.id="titletext";
    title.append(titletext);

    if(project.github!=null){
        const githublink = document.createElement("a");
        githublink.href=project.github;
        githublink.className="gh";
        githublink.target="_blank";
        titletext.append(githublink);

        const githubimg=document.createElement("img");
        githubimg.src="https://tessamitchell.github.io/images/githublogo.png";
        githublink.append(githubimg);

    }

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

    if(project.description != null || project.description != ""){
        const description=document.createElement("p");
        description.textContent="Description: " + project.description;
        col2.append(description);
    }
    

    const tags=document.createElement("div");
    tags.className="code-tags";
    col2.append(tags);

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
        filter.style.backgroundColor = (filter.textContent===tag) ? "#aeafe7" :"#626280";
        filter.style.fontWeight = (filter.textContent===tag) ? "bold" :"normal";
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
    })

    document.getElementById("clear-btn").disabled=true;
}