const loadPosts = async(limit) =>{
    toggleSpinner(true)
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(url);
    const data = await res.json(); 
    displayPost(data.data.tools,limit);
}



    const displayPost = (posts,limit) =>{ 
    const postContainer = document.getElementById('post-container');
    // display 6 features only 
    const showAll = document.getElementById('show-all'); 
    if(limit && posts.length > limit) {
        posts = posts.slice(0, limit); 
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    // display all features
    posts.forEach(post =>{ 
 
    //  let publish_date=   Date.parse(post.published_in).toString("DD MMM YYYY");
    //  publish_date = date.toString("DD MMM YYYY")
    let publish_date =dateFormate(post.published_in) 

    const postDiv  = document.createElement('div');
    postDiv.classList.add('col');

    let features ='<ol>';
    post.features.forEach(feature=>{
        features +=`
        <li>${feature}</li>
        `;
    });
    features +='</ol>';

    postDiv.innerHTML = `
    <div class="card p-4">
        <img src="${post.image}" class="card-img-top" alt="...">
        <div class="card-body ps-0 pe-0 pb-0">
            <h5 class="card-title">Features</h5>${post.features[0]}
            <p class="card-text">${features}</p>
            <div class="card-footer">
            <h4>${post.name}</h4>
            <p> <svg class="publish_date_svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75M12 12.75H12.008V12.758H12V12.75ZM12 15H12.008V15.008H12V15ZM12 17.25H12.008V17.258H12V17.25ZM9.75 15H9.758V15.008H9.75V15ZM9.75 17.25H9.758V17.258H9.75V17.25ZM7.5 15H7.508V15.008H7.5V15ZM7.5 17.25H7.508V17.258H7.5V17.25ZM14.25 12.75H14.258V12.758H14.25V12.75ZM14.25 15H14.258V15.008H14.25V15ZM14.25 17.25H14.258V17.258H14.25V17.25ZM16.5 12.75H16.508V12.758H16.5V12.75ZM16.5 15H16.508V15.008H16.5V15Z" stroke="#585858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="pt-1">  ${publish_date}</span>  
            <a href="#" 
            class="float-end arrow_btn" 
            data-bs-toggle="modal" data-bs-target="#showDetails"
            onclick=loadSinglePost("${post.id}")>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25" cy="25" r="25" fill="#FEF7F7"/>
<path d="M17.5 25H32.5M32.5 25L25.75 18.25M32.5 25L25.75 31.75" stroke="#EB5757" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </a>

            </p>
            </div>
        </div>
    </div>
    `;
    postContainer.appendChild(postDiv);
    toggleSpinner(false)
});

 
    document.getElementById('btn-show-all').addEventListener('click', function(){
        loadPosts()
    })
   
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


function dateFormate(date){
    const dateObj = new Date(date);
    var month = dateObj.getMonth() + 1; 
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();    
   return newdate = year + "/" + month + "/" + day;
}


loadPosts(6)


// =========================Single Post Action=========================

const loadSinglePost = async(id) =>{

    toggleSpinner(true)
    const url = 'https://openapi.programming-hero.com/api/ai/tool/'+id
    const res = await fetch(url);
    const data = await res.json();     
    const tool =data.data;
console.log(tool);

document.getElementById("toolDescription").innerHTML =tool.description; 

let priceTable='';
tool.pricing.forEach(price=>{
    priceTable +=`
    <div class="col-md-4"><span>${price.price}</span> <span>${price.plan}</span></div>
    `
})
document.getElementById("priceTable").innerHTML =priceTable;  

console.log(tool.features);
 
// let featureList='';

// tool.features.forEach(feature=>{
//     featureList +=`
//      <li>sad</li>
//     `
// })
// document.getElementById("priceTable").innerHTML =featureList;  

 
let intregrateList='';

tool.integrations.forEach(intregrate=>{
    intregrateList +=`
     <li>${intregrate}</li>
    `
})
document.getElementById("intregrateList").innerHTML =intregrateList;  
 

document.getElementById("toolImage").setAttribute('src',tool.image_link[0]);  
document.getElementById("score").innerHTML =tool.accuracy;  



} 


 
 