function changeBackground() {
    const backgroundContainer = document.getElementById('backgroundContainer');
    backgroundContainer.style.backgroundImage = `url('https://picsum.photos/1920/1080?random=${Math.floor(Math.random() * 1000)}')`;
}

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('changeBackgroundButton');
    button.addEventListener('click', changeBackground);
});
