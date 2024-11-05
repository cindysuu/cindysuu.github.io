let isImageBackground = false;

// For updating bg image
function changeBackground() {
    const backgroundContainer = document.getElementById('backgroundContainer');
    const isMobile = window.innerWidth <= 768;
    const imageUrl = isMobile ? 'https://picsum.photos/768/1024?random=' : 'https://picsum.photos/1920/1080?random=';
    backgroundContainer.style.backgroundImage = `url('${imageUrl}${Math.floor(Math.random() * 1000)}')`;
    isImageBackground = true;
}

// For updating bg color
function updateBackgroundColor() {
    const selectedColor = document.getElementById('hs-color-input').value;
    const backgroundContainer = document.getElementById('backgroundContainer');
    backgroundContainer.style.backgroundColor = selectedColor;

    // Remove the image background if currently set to an image
    if (isImageBackground) {
        backgroundContainer.style.backgroundImage = 'none';
        isImageBackground = false;
    }
}

// For setting color from presets
function updateBackgroundColorFromPreset(color) {
  document.getElementById('backgroundContainer').style.backgroundColor = color;
  document.getElementById('hs-color-input').value = color;

  // Remove the image background if currently set to an image
  if (isImageBackground) {
    backgroundContainer.style.backgroundImage = 'none';
    isImageBackground = false;
}
}

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('changeBackgroundButton');
    button.addEventListener('click', changeBackground);

    const colorInput = document.getElementById('hs-color-input');
    colorInput.addEventListener('input', updateBackgroundColor);
});

// Modal functions
function openModal() {
    document.getElementById("myModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("myModal").classList.add("hidden");
}
  
// Fade in/out transition
document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector("body"); // Adjust selector to your main content area
    content.classList.add("fade-in");
    setTimeout(() => content.classList.add("fade-in-active"), 10);

    // Handle link clicks to apply fade-out transition
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const url = link.getAttribute("href");

            // Add fade-out classes
            content.classList.remove("fade-in-active");
            content.classList.add("fade-out");

            // Navigate after the transition
            setTimeout(() => {
                window.location.href = url;
            }, 500); // Matches transition duration
        });
    });
});
