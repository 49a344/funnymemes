document.getElementById('overlayButton').addEventListener('click', function () {
    const img = new Image();
    const fileInput = document.getElementById('fileInput'),
        ERROR = document.getElementById('fileInfo'),
        canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'); // 2D canvas

    if (fileInput.files.length < 1) {
        ERROR.innerHTML = '<br>Select a file!'; // Ask for files
        return;
    }


    const file = fileInput.files[0]; // Only one file allowed
    img.src = URL.createObjectURL(file); // Temp URL for uploaded file

    img.onload = () => {
        canvas.width = canvas.height = 1080;
        ctx.drawImage(img, 0, 0, 1080, 1080); // Stretch all images to 1:1

        const imgCount = 5; // Replace when necessary
        const overlayIndex = Math.floor(Math.random() * imgCount) + 1; // Random overlay index
        const overlay = new Image();
        overlay.src = `common/olay/${overlayIndex}.avif`; // Label files numerically, use avif

        overlay.onload = () => {
            ctx.drawImage(overlay, 0, 0, 1080, 1080); // Draw overlay
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob); // Create blob to download file
                const a = document.createElement('a'); // Temporary anchor for opening URL
                a.href = url; a.download = 'meme.png'; a.click(); // Set filename and open URL
            }, 'image/png'); // Export as PNG
        };

        overlay.onerror = () => console.error('Error loading overlay.');
    };

    img.onerror = () => {
        console.error('<br>Error loading your image!');
        ERROR.innerHTML = '<br>Error loading your image!';
    };
});
