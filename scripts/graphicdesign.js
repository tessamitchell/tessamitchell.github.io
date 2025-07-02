let allCards=[document.getElementById("code-card")];
let allTags=[];

let sampledata={
    name:"RetroWeird Logo Designs",
    imagebase:"https://tessamitchell.github.io/images/retroweird/",
    images:[
        "logo2favorite.png",
        "logo1.png",
        "logo3.png"],
    descriptions:[
        "Here are some words to test.",
        "This design was a follow-along with my professor for the class.  It is not particularly my style or what I would have designed myself, but it was used by our professor to show us tools and techniques in Adobe Illustrator.",
        "Here are some words to test with the joystick logo."],
    descriptionbase:"These designs were for an Intro to Digital Media Design class I took.  We were supposed to design a few logos for the fictional company 'RetroWeird Software', in line with the company brief we were given: 'The purpose of RetroWeird Software is to create and distribute modern video games that have a retro feel. Modern gaming could include VR and online multiplayer games.'",
    date:"2024-10-03"
}
//createCard(sampledata);

function fetchJSONData() {
    fetch('https://tessamitchell.github.io/data/designprojects.json')
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
            //data.sort((a, b) =>  new Date(b.date) - new Date(a.date)); // sort by most recent

            data.forEach(project => createCard(project));
            //addTags();
        })  
        .catch(error => console.error('Failed to fetch data:', error)); 
}
fetchJSONData();




function createCard(project){
    const codeCard=document.createElement("div");
    codeCard.className="code-card";

    document.getElementById("gd-container").append(codeCard);
    const col1=document.createElement("div");
    col1.className="code-image";

    codeCard.append(col1);


    const col2=document.createElement("div");
    col2.className="code-info";
    codeCard.append(col2);



    if(project.images.length >1){
        const imgrow=document.createElement("div");
        imgrow.className="design-row";
        col1.append(imgrow);


        for(let i=0;i<project.images.length;i++){

            const imgoption = document.createElement("div");
            imgoption.className="design-img-option";
            imgrow.append(imgoption);

            const imgsmall= document.createElement("img");
            imgsmall.src=project.imagebase + project.images[i];
            let index=allCards.length;
            imgsmall.onclick=()=>expand(imgsmall,index);
            imgsmall.alt=project.descriptions[i];

            imgoption.append(imgsmall);
        }
    }
    const imagecont=document.createElement("div");
    imagecont.className="design-display";
    col1.append(imagecont);

    const image=document.createElement("img");
    image.src=project.imagebase + project.images[0];
    image.id="expandedImg";

    

    if(project.name.toLowerCase().includes("teepublic")){
        const link=document.createElement("a");
        link.href="https://www.teepublic.com/user/beloveandabow";
        link.target="_blank";
        imagecont.append(link);
        
        link.append(image);
    }
    else{
        imagecont.append(image);
    }
    
    
    







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

    
    const brief = document.createElement("p");
    brief.textContent= project.descriptionbase;
    col2.append(brief);
    

    
    const description=document.createElement("p");
    description.textContent=project.descriptions[0];
    description.id="imgdescription";
    description.className="imgdescription";
    col2.append(description);
    const software=document.createElement("p");
    software.textContent="Created with: " + project.software;

    

    // const tags=document.createElement("div");
    // tags.className="code-tags";
    // col2.append(tags);

    // for(let i=0;i<project.tags.length;i++){
    //     const tag=document.createElement("button");
    //     tag.textContent=project.tags[i];
    //     tag.className="tag-button";
        
    //     tag.style.marginRight=String(40/project.tags.length)+"%";
        
    //     tag.onclick=() => filterbytag(project.tags[i]);

    //     tags.append(tag);

    //     if(!allTags.includes(project.tags[i])){
    //         allTags.push(project.tags[i]);
    //     }

    // }




    // document.getElementById("gd-container").append(codeCard);

    allCards.push(codeCard);
}





function expand(imgs,i) {
    
    // Get the expanded image
    var expandImg = allCards[i].querySelector("#expandedImg");
    // Get the image text
    
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    var imgText = allCards[i].querySelector("#imgdescription");
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.textContent = imgs.alt;

  }

