// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img =document.getElementById("myImg");
var imgs = document.getElementsByClassName("myImgs");
var modalImg = document.getElementById("m-scontent");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
//   modalImg.src = this.src;

    for (var img in imgs){
            const newImage = document.createElement('img');

// Set the source of the image
            newImage.src = img.src;

// Optionally, set an alt attribute for accessibility
            newImage.alt = 'Description of the image';

            modal.append(newImage);
    }


  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}