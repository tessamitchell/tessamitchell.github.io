
let allCards=[];



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
            data.forEach(project => {
                project.date = new Date(project.date);
            });

            // Sort and create cards
            data.sort((a, b) =>  b.date - a.date); // sort by most recent
            data.forEach(project => createCard(project));
        })  
        .catch(error => console.error('Failed to fetch data:', error)); 
}
fetchJSONData();





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

    const image=document.createElement("img");
    image.setAttribute("src",project.image);
    col1.append(image);

    const col2=document.createElement("th");
    col2.className="code-info";
    row1.append(col2);

    const title=document.createElement("div");
    title.className="title";
    col2.append(title);

    const titletext=document.createElement("h2");
    titletext.textContent=project.name;
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
    date.textContent= String(project.date.getUTCMonth()+1)+"-"+String(project.date.getUTCDate())+"-"+String(project.date.getUTCFullYear());
    title.append(date);

    if(project.brief != null){
    const brief = document.createElement("p");
    brief.textContent="Brief: " + project.brief;
    col2.append(brief);
    }

    const description=document.createElement("p");
    description.textContent="Description: " + project.description;
    col2.append(description);

    const tags=document.createElement("div");
    tags.className="code-tags";
    col2.append(tags);

    for(let i=0;i<project.tags.length;i++){
        const tag=document.createElement("button");
        tag.textContent=project.tags[i];
        tag.style.marginLeft=String(20/project.tags.length)+"%";
        tag.style.marginRight=String(20/project.tags.length)+"%";

        tags.append(tag);
    }




    document.getElementById("mainbody").append(codeCard);

    allCards.append(codeCard);
}






function sortbydate(){

}

function sortbyname(){

}

function sortbytag(tag){

}