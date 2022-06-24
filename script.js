const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash APi 
const count = 30;
const apiKey ='q6TVcIV7zJcxDmmydevG6R9wXJlEQMKr3eqHqoeABc0';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded 
function imageLoaded() {
    
    imagesLoaded++;
    
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true; 
        
    }
}
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
  // Run function for each object in photosArray
    photosArray.forEach((photo) => {
    //creating an anchor element to link to unsplash
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');
    // Create <img> for photo 
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('alt', photo.alt_description);
    // Event Listener, check when each is finished loading 
    img.addEventListener('load', imageLoaded);
    //put <img> inside <a></a>, then put inside the image container element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}
// Get Photos from upsplash api 

async function getPhotos() {
    try {
      const response = await fetch(apiURL);
      photosArray = await response.json();
      displayPhotos();
    } catch(error) {
     // Catch Error Data
    }
}

//Check to see if scrolling near bottom of page, load more photos 

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// On Load

getPhotos();