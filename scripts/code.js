


const datasample={
    name:"Twodle",
    github:"https://github.com/tessamitchell/Twodle", 
    brief:"These are words",
    image:"https://tessamitchell.github.io/images/websitemockup.jpg",
    description:"This app was developed for my C#/.NET class.",
    date:"2025-05-11",
    tags:["Game Dev", "WPF","C#","XAML",".NET","Group Project"]
};

const datasample2={
    name:"Twodle",
    github:null, 
    brief:"Final project for my C#/.NET class. A partner project where we had to develop a desktop application of our choice. There were nine requirements that we had to pick 8 of to employ, ranging from arrays to threading.",
    image:"https://tessamitchell.github.io/images/websitemockup.jpg",
    description:"Me and my partner built a Twodle game, which is essentially two games of Wordle being played at the same time where each guess applies to both games.  The work was split pretty evenly, with the two of us collaborating on how to do it, and switching off tasks.",
    date:"2025-05-11",
    tags:["Game Dev", "WPF","C#",".NET","Group Project"]
};

//createCard(datasample);
//createCard(datasample2);

let allCards=[];



function fetchJSONData() {
    fetch('https://tessamitchell.github.io/data/codeprojects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  
        })
        .then(data => console.log(data))  
        .catch(error => console.error('Failed to fetch data:', error)); 
}

let data=fetchJSONData(); 
for(let i=0;i<data.length;i++){
    data[i].date=new Date(data[i].date);
    //print(data[i]);
}


data.forEach(project => createCard(project));


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
    date.textContent=project.date;
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

    //allCards.append(codeCard);
}






// function sortbydate(){

// }

// function sortbyname(){

// }

// function sortbytag(tag){

// }