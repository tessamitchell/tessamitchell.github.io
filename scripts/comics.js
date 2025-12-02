// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img =document.getElementById("comicImg");
// var imgs = document.getElementsByClassName("comicImgs");

var pages= ["https://tessamitchell.github.io/images/comics/hedypage1.png","https://tessamitchell.github.io/images/comics/hedypage2.png"];
var modalImg = document.getElementById("m-scontent");
var captionText = document.getElementById("caption");

for (let i=0;i<pages.length;i++){
            const newImage = document.createElement('img');

// Set the source of the image
            newImage.src = pages[i];

// Optionally, set an alt attribute for accessibility
            newImage.alt = 'Description of the image';

            modal.append(newImage);
}

img.onclick = function(){
  modal.style.display = "block";
//   modalImg.src = this.src;

    


  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}