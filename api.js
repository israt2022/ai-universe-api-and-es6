const loadFeatures = async() =>{
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    displayFeatures(data.data);
}
const displayFeatures = (data) =>{
    // console.log(data);
    const featuresContainer = document.getElementById('features-container');
    // display 6 features only 
    const showAll = document.getElementById('show-all');
        features = data.tools.slice(0, 6);
    //     const showAll = document.getElementById('show-all');
    // if(dataLimit && phones.length > 6) {
    //     features = data.tools.slice(0, 6);
    //     showAll.classList.remove('d-none');
    // }
    // else{
    //     showAll.classList.add('d-none');
    // }
    // display all features
    data.tools.forEach(feature =>{
        console.log(feature);
        const featureDiv  = document.createElement('div');
        featureDiv.classList.add('col');
        featureDiv.innerHTML = `
        <div class="card p-4">
            <img src="${feature.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${feature.name}</h5>
                <p class="card-text">${feature.description?feature.description:'N/A'}</p>
                <div class="card-footer">
                <h4>${feature.name}</h4>
                <p>${feature.published_in}</p>
                </div>
            </div>
        </div>
    `;
    featuresContainer.appendChild(featureDiv);
});

    // stop spinner or loader
    toggleSpinner(false);
    document.getElementById('btn-show-all').addEventListener('click', function(){

    })
    // start spinner or loader
    toggleSpinner(true);
}
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}
loadFeatures()