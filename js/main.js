console.log("ONLOADED")
// get color from image
const image = document.querySelector('.spotlight-poster-image');
const container = document.getElementById('home');

image.onload = function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const imageData = ctx.getImageData(0, 0, image.width, image.height).data;
    const color = getDominantColor(imageData);

    const gradientColor = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;

    // container.style.background = `rgb(2, 0, 36) linear-gradient(135deg, rgba(2, 0, 36, 1) 34%, ${gradientColor} 85%)`;
    console.log(gradientColor);
};

function getDominantColor(imageData) {
    const colorCounts = {};

    for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];

        const color = `${r}-${g}-${b}`;
        colorCounts[color] = (colorCounts[color] || 0) + 1;
    }

   

    const sortedColors = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]);
    const [r, g, b] = sortedColors[0].split('-').map(Number);

    return { r, g, b };
}

