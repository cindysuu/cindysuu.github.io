let isImageBackground = false;

// For updating bg image
function changeBackground() {
    const backgroundContainer = document.getElementById('backgroundContainer');
    backgroundContainer.style.backgroundImage = `url('https://picsum.photos/1920/1080?random=${Math.floor(Math.random() * 1000)}')`;
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
  