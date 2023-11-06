console.log("yeet");

// Running the tracing
function onFormSubmit() {
    console.log("gucci gang");

    // Gets an array of all the input fields
    const inputs = document.querySelectorAll('input[type="number"]');

    // Loops through each input field, if one is empty then reassign it's default value to it
    inputs.forEach(function(input) {
        const defaultValue = input.getAttribute('dValue');
        if (!input.value) {
            input.value = defaultValue;
        }
    });
}

// Changing the preview image
function changePreviewPicture(fileInput) {
    const imagePreview = document.getElementById('tracedPreview');
    const downloadButton = document.getElementById("downloadButton");

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        // Display the uploaded image
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // Enable the download button
        downloadButton.disabled = false;
        downloadButton.style.display = "block";
    } else {
        imagePreview.src = '';
    }
}

// To download the files 
function downloadImage() {
    const a = document.createElement("a");
    a.href = tracedPreview.src;
    a.download = "downloaded_image.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
