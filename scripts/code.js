//import data from 'tessamitchell.github.io/data/codeprojects.json';

const datasample={
    name:"Twodle",
    github:"https://github.com/tessamitchell/Twodle", 
    brief:"These are words",
    image:"https://tessamitchell.github.io/images/websitemockup.jpg",
    description:"This app was developed for my C#/.NET class.",
    date:"05-11-2025",
    tags:["Game Dev", "WPF","C#","XAML",".NET"]
};

createCard(datasample);



// data.forEach(project => createCard(project));

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

    const title=document.createElement("h2");
    title.textContent=project.name;
    col2.append(title);

    if(project.github!=null){
        const githublink = document.createElement("a");
        githublink.src=project.github;
        githublink.className="gh";
        githublink.target="_blank";
        title.append(githublink);

        const githubimg=document.createElement("img");
        githubimg.src="https://tessamitchell.github.io/images/githublogo.png";
        githublink.append(githubimg);

    }

    const date= document.createElement("h6");
    date.textContent=project.date;
    col2.append(date);

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
        tags.append(tag);
    }


    document.getElementById("mainbody").append(codeCard);
}