const webCamElement = document.getElementById("webCam");
const canvasElement = document.getElementById("canvas");
const webcam = new Webcam(webCamElement, "user", canvasElement);
webcam.start();

function takeAPicture() {
    let picture = webcam.snap();
    
    imageReader(picture);
    
}

function imageReader(picture) {
    const ctx = canvasElement.getContext('2d');
    const img = new Image();

    img.src = picture;
    
    img.onload = function () {

    ctx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);

    const base64String = canvasElement.toDataURL('image/png');

    console.log(base64String);
    sendPlantAI(base64String);

    };
}

function sendPlantAI(base64String) {
    const urlSend = "https://plant.id/api/v3/identification";
    const optionsSend = {
        method: 'POST',
        headers: {
            'Api-Key': '5PjvCCc4O59xNAgu58UaxQKWk99qSxcJgYd7S0Wh8BDyBN8pLz',
            'Content-Type': 'application/json'
        },
     body: JSON.stringify({images : base64String}, {similar_images : true})
    };

    const response = fetch(urlSend, optionsSend)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
    })
    .then(updatedData => {
        console.log('Data updated:', updatedData);
        window.document.location = './Information.html' + '?accessKey=' + updatedData.access_token;
    })
    .catch(error => {
        console.error('Error updating data:', error);
    });
}