function pageLoaded() {
    let accessKey = document.location.search.replace(/^.*?\=/, '')
    const urlRetrieve = `https://plant.id/api/v3/identification/${accessKey}?details=common_names,name_authority,description,image,watering&language=en`;
    const optionsRetrieve = {
        method: 'GET',
        headers: {
            'Api-Key': '5PjvCCc4O59xNAgu58UaxQKWk99qSxcJgYd7S0Wh8BDyBN8pLz',
            'Content-Type': 'application/json'
            
     }
    };

    fetch(urlRetrieve, optionsRetrieve)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(updatedData => {
            console.log('Data updated:', updatedData);
            displayData(updatedData);
        })
        .catch(error => {
            console.error('Error updating data:', error);
        });
}

function displayData(updatedData) {
    const plantName = updatedData.result.classification.suggestions[0].name;
    document.getElementById("plantName").textContent = plantName;

    const plantDescription = updatedData.result.classification.suggestions[0].details.description.value;
    document.getElementById("plantDescription").textContent = plantDescription;

    const plantImageContainer = document.getElementById("plantImage")
    const plantImage = updatedData.result.classification.suggestions[0].details.image.value;
    plantImageContainer.src = plantImage;
}

function exitPage() {
    window.document.location = "./index.html";
}
