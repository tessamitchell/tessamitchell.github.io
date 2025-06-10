import data from 'tessamitchell.github.io/data/codeprojects.json';


// <div class="code-card">
//             <table>
//                 <tr>
//                     <th class="code-image">
//                         <img src="images/websitemockup.jpg">
//                     </th>
//                     <th class="code-info">
//                         <h2>Twodle
//                             <a class="gh" href="https://github.com/tessamitchell/Twodle" target="_blank"><img src="images/githublogo.png"></a>
//                         </h2>
//                         <h6>05-11-2025</h6>
//                         <p><b>Brief:</b> Class assignment to work with a partner to develop a desktop application of our choice.  There were nine requirements that we had to pick 8 of to employ, ranging from arrays to threading.</p>
//                         <p><b>Description:</b> Me and my partner decided to build a Twodle game, which is essentially two games of Wordle being played at the same time where each guess applies to both games.</p>
//                         <div class="code-tags">
//                         <button>Game Dev</button>
//                         <button>WPF</button>
//                         <button>C#</button>
//                         <button>.NET</button>
//                         <button>Group</button>
//                     </th>
//                 </tr>
                
//             </table>

                
//             </div>
data.forEach(createCard);

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
        githubimg.src="tessamitchell.github.io/images/githublogo.png";
        githublink.append(githubimg);

    }

    const date= document.createElement("h6");
    date.textContent=project.date;
    col2.append(date);

    if(project.brief != null){
    const brief = document.createElement("p");
    brief.textContent=project.brief;
    col2.append(brief);
    }

    const description=document.createElement("p");
    description.textContent=project.description;
    col2.append(description);

    const tags=document.createElement("div");
    tags.className="code-tags";

    for(i=0;i<project.tags.length;i++){
        const tag=document.createElement("button");
        tag.textContent=project.tags[i];
        tags.append(tag);
    }


}