let signedUrl = null;

// Running the tracing
async function onFormSubmit() {

    console.log("Start of Tracing");
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
    let stemToIgnore = document.getElementById('input5').value;
    if (!stemToIgnore){
        stemToIgnore = 0;
    }
    
    // Prepare the data to be sent
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = async function(event) {
            const imageData = event.target.result;
            const requestData = {
                redBranch: parseInt(redBranch),
                redCellBranch: parseInt(redCellBranch),
                xOffset: parseInt(xOffset),
                yOffset: parseInt(yOffset),
                stemToIgnore: stemToIgnore,
                imageData: imageData
            };
        
            const lambdaURL = 'https://kt7vclhx7jbrtdfews4k3sf2fa0ysjek.lambda-url.us-east-1.on.aws/';
            const headers = {
              'Content-Type': 'application/json',
            };
                    
            const options = {
              method: 'POST', 
              headers: headers,
              body: JSON.stringify(requestData),
            };
          
            try {
              changeSubmitToLoading()
              const response = await fetch(lambdaURL, options);
              const data = await response.text();
              
              const parsedResponse = JSON.parse(data);
              signedUrl = parsedResponse.signedUrl;
              const tracedExample = parsedResponse.tracedExample;
            
              const picToChange = document.getElementById("tracedPreview");
              picToChange.src = "data:image/jpeg;base64," + tracedExample;
              
              // Enable the download button
              const downloadButton = document.getElementById("downloadButton");
              downloadButton.disabled = false;
              downloadButton.style.display = "block";         
              console.log("Image Processed")

              // Handle the response data as needed
            } catch (error) {
              console.error('Error calling Lambda function:', error);
              // Handle errors here
            }
            changeLoadingToSubmit()

           /* // Make a POST request to the API Gateway endpoint
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
                const parsedResponse = JSON.parse(data);
                signedUrl = parsedResponse.signedUrl;
                const tracedExample = parsedResponse.tracedExample;
              
                const picToChange = document.getElementById("tracedPreview");
                picToChange.src = "data:image/jpeg;base64," + tracedExample;
                
                // Enable the download button
                const downloadButton = document.getElementById("downloadButton");
                downloadButton.disabled = false;
                downloadButton.style.display = "block";         
                console.log("Image Processed")
            })
            .catch(error => {
                console.error('Error:', error);
            });*/
        };

        reader.readAsDataURL(file);
    } else {
        console.error('No file selected.');
    }
}  

function downloadZipFile() {
    // Decode base64 data to binary
    if (signedUrl) {
        const link = document.createElement("a");
        link.href = signedUrl;
        link.download = "processed_images.zip";
        // Use the click() method of the anchor element to initiate the download.
        link.click();
    } else {
        console.error('No ZIP data available');
    }
}

// Changing the preview image
function changePreviewPicture(fileInput) {
    const imagePreview = document.getElementById('tracedPreview');
    //const downloadButton = document.getElementById("downloadButton");

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        // Display the uploaded image
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // Enable the download button
       // downloadButton.disabled = false;
       // downloadButton.style.display = "block";
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

function changeSubmitToLoading() {
    const submitButton = document.getElementById("submitButton");
    submitButton.style.backgroundColor = 'rgb(199,182,0)';
    submitButton.style.color = 'rgb(0,0,0)';
    submitButton.value = 'Tracing In Progress'
    submitButton.style.cursor = 'not-allowed';
    submitButton.disabled = true;
}

function changeLoadingToSubmit() {
    const submitButton = document.getElementById("submitButton");
    submitButton.style.backgroundColor = 'rgb(46,112,184)';
    submitButton.style.color = 'rgb(255,255,255)';
    submitButton.value = 'Submit'
    submitButton.style.cursor = 'pointer'; 
    submitButton.disabled = false;

    submitButton.onmouseover = function() {
        this.style.backgroundColor = '#84FF87';
        this.style.color = 'black';
    };
    submitButton.onmouseout = function() {
        this.style.backgroundColor = 'rgb(46, 112, 184)';
        this.style.color = 'rgb(255, 255, 255)';
    };
}

// Validation only single direction fields were entered for the stem to ignore
function validateDirection(input) {
    input.value = input.value.replace(/[^NnSsWwEe]|/g, '');
    input.value = input.value.toUpperCase();
}




