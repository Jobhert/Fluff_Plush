document.addEventListener('DOMContentLoaded', function() {
    const images = [
        "images/Mewo.jpg",
        "images/Rimuru.jpg",
        "images/Kirby.jpg",
        "images/Hakurei.jpg",
        "images/Freddy.jpg"
    ];
    let currentImageIndex = 0;
    const slideshowImage = document.querySelector('.slideshow-image');

    function changeImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        slideshowImage.src = images[currentImageIndex];
    }

    setInterval(changeImage, 3000); 
});