// Variables for lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeBtn = document.querySelector('.close');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;
let interval;
const galleryItems = document.querySelectorAll('.gallery-item');

// Open lightbox
function openLightbox(index) {
    const item = galleryItems[index];
    const type = item.getAttribute('data-type');
    const src = item.getAttribute('data-src');

    if (type === 'image') {
        lightboxImg.src = src;
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
    } else if (type === 'video') {
        lightboxVideo.src = src;
        lightboxVideo.style.display = 'block';
        lightboxImg.style.display = 'none';
    }

    lightbox.style.display = 'flex';
}

// Close lightbox
function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.style.display = 'none';
    lightboxVideo.style.display = 'none';
    clearInterval(interval);
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
}

// Show next item in the gallery
function showNextItem() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
}

// Show previous item in the gallery
function showPrevItem() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
}

// Play slideshow
function playSlideshow() {
    interval = setInterval(showNextItem, 3000); // Change slide every 3 seconds
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
}

// Pause slideshow
function pauseSlideshow() {
    clearInterval(interval);
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
}

// Handle gallery item click
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        openLightbox(currentIndex);
    });
});

// Close lightbox when clicking the close button
closeBtn.addEventListener('click', closeLightbox);

// Play and pause buttons
playBtn.addEventListener('click', playSlideshow);
pauseBtn.addEventListener('click', pauseSlideshow);

// Previous and Next buttons
prevBtn.addEventListener('click', showPrevItem);
nextBtn.addEventListener('click', showNextItem);

// Optional: Close lightbox when clicking outside the content
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});
