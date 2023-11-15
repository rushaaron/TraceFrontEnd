// Running the tracing
function onFormSubmit() {

    // Gets an array of all the input fields
    const inputs = document.querySelectorAll('input[type="number"]');

    // Loops through each input field, if one is empty then reassign it's default value to it
    inputs.forEach(function(input) {
        const defaultValue = input.getAttribute('dValue');
        if (!input.value) {
            input.value = defaultValue;
        }
    });

    // Passing image to a lambda function 
    const fileInput = document.getElementById('file-input');
    const redBranch = document.getElementById('input1').value;
    const redCellBranch = document.getElementById('input2').value;
    const xOffset = document.getElementById('input3').value;
    const yOffset = document.getElementById('input4').value;
    const stemToIgnore = document.getElementById('input5');
    console.log("Stem: " + stemToIgnore);
    console.log("redbranch: " + redBranch);

    // Prepare the data to be sent
   
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const imageData = event.target.result;
            const requestData = {
                redBranch: parseInt(redBranch),
                redCellBranch: parseInt(redCellBranch),
                xOffset: parseInt(xOffset),
                yOffset: parseInt(yOffset),
                stemToIgnore: stemToIgnore,
                imageData: imageData
            };
        
            // Make a POST request to the API Gateway endpoint
            fetch('https://wytngibhdk.execute-api.us-east-1.amazonaws.com/dev/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
            .then(response => response.text())
            // Uploading image to website
            .then(data => {                
                const picToChange = document.getElementById("tempPic");
                picToChange.src = "data:image/jpeg;base64," + data;
                
                console.log('Image processed and uploaded:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        };

        reader.readAsDataURL(file);
    } else {
        console.error('No file selected.');
    }
}

function yeetonthyfeet() {  
    const xValue = document.getElementById('input1').value;
    const yValue = document.getElementById('input1').value;
    const messageValue = document.getElementById('input4').value;

    // Prepare the data to be sent
   const requestData = {
        x: parseInt(xValue),
        y: parseInt(yValue),
        message: messageValue
    };

    // Make a POST request to the API Gateway endpoint
    fetch('https://5bdlgmqza6.execute-api.us-east-1.amazonaws.com/simpleBeta/SimpleResource', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data as needed
        console.log('API Gateway response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
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

// Validation only single direction fields were entered for the stem to ignore
function validateDirection(input) {
    input.value = input.value.replace(/[^NnSsWwEe]|/g, '');
    input.value = input.value.toUpperCase();
}




