

const searchMobile = async () =>{
    const searchText = document.getElementById('searchText');
    const allPhone = document.getElementById('productResults');
    const singleData = document.getElementById('singleData');
    allPhone.innerHTML = '';
    singleData.innerHTML = '';
    const foundText = searchText.value;
        if(foundText == ""){
            const textMessage = document.getElementById('textMessage');
            textMessage.classList.remove('d-none')
            textMessage.classList.add('d-flex')
            const blinkMessage = document.getElementById('blinkMessage');
            blinkMessage.innerText = `Search field is empty!`
            setTimeout(emptyError, 3000);
            
        }else{
            const textMessage = document.getElementById('textMessage');
            textMessage.classList.remove('d-flex')
            textMessage.classList.add('d-none')
            const url = `https://openapi.programming-hero.com/api/phones?search=${foundText}`;
            const res = await fetch(url);
            if(res.ok){
                const data = await res.json();
                data.status === true ? displayingMobiles(data.data) : errorMessage();    
            }else{
                return false;
            }     
        }
        searchText.value = ""
    }

//empty error Message
const emptyError=()=>{
    const textMessage = document.getElementById('textMessage');
    textMessage.classList.add('d-none')
    textMessage.classList.remove('d-flex')
    const blinkMessage = document.getElementById('blinkMessage');
    blinkMessage.innerText = `Search field is empty!`
}
// Load all search result
const displayingMobiles = mobiles =>{
   
    for(let mobile of mobiles){
        
        // const allPhone = document.getElementById('proResult');
        const allPhone = document.getElementById('productResults');
       
        allPhone.classList.add('d-flex');
        allPhone.classList.remove('d-none');
        
        //child div creation
        var parentDiv = document.createElement('div');
        parentDiv.classList.add('border');
        parentDiv.classList.add('border-1');
        parentDiv.classList.add('rounded-3');
        parentDiv.classList.add('removeDiv');
        parentDiv.classList.add('mx-2');
        parentDiv.classList.add('col-4');
        parentDiv.classList.add('col-sm-12');
        parentDiv.classList.add('col-md-4');
        parentDiv.style.width="18rem";
        allPhone.appendChild(parentDiv)

        //child img tag creation
        var img = document.createElement('img');
        img.style.width="150px";
        img.style.height="170px";
        img.src = `${mobile.image}`;
        img.classList.add('card-img-top');
        img.classList.add('justify-content-center');
        img.classList.add('mx-auto');
        img.classList.add('mt-2');
        img.classList.add('d-flex');
        // img.attributes.add('...');
        parentDiv.appendChild(img);

        //again child inside parent div
        var childDiv = document.createElement('div');
        childDiv.classList.add('card-body');
        childDiv.classList.add('p-1');
        childDiv.classList.add('mb-2');
        parentDiv.appendChild(childDiv);

        //child h tag inside child div
        var childHTag = document.createElement('h5');
        childHTag.classList.add('card-title');
        childHTag.id = "cardId";
        const textNode1 = document.createTextNode(`${mobile.brand}`);
        childHTag.appendChild(textNode1);
        childDiv.appendChild(childHTag);

        //child p tag inside child div
        var childPTag = document.createElement('p');
        childPTag.classList.add('card-text');
        const textNode2 = document.createTextNode(`${mobile.phone_name}`);
        childPTag.appendChild(textNode2);
        childDiv.appendChild(childPTag);

        //inner child div tag inside child div
        var innerChildDiv = document.createElement('div');
        innerChildDiv.classList.add('d-flex');
        innerChildDiv.classList.add('justify-content-between');
        childDiv.appendChild(innerChildDiv);

        //inner p tag
        var innerPTag = document.createElement('p');
        const textNode3 = document.createTextNode(`$12000`);
        innerPTag.appendChild(textNode3);
        innerChildDiv.appendChild(innerPTag);

        //create element button
        var buttonTag = document.createElement('button');
        buttonTag.classList.add('btn');
        buttonTag.classList.add('btn-primary');
        buttonTag.classList.add('buttonClass');

        // buttonTag.id="buttonId";
        buttonTag.setAttribute("onclick", "detailsOnClick()");
        buttonTag.id = `${mobile.slug}`;
        var buttonText = document.createTextNode('Details');
        buttonTag.appendChild(buttonText);
        innerChildDiv.appendChild(buttonTag);
    }
    
}

// Showing single product details
const detailsOnClick =() =>{
         const slug =  document.getElementsByClassName('buttonClass')[0].id;
         if(slug !== ""){
            const allPhone = document.getElementById('productResults');
            allPhone.classList.add('d-none');
            allPhone.classList.remove('d-flex')
            fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
            .then(res => res.json())
            .then(data => singleDataDetails(data.data));
         }  
} 

// Cleaning all previous search result
const singleDataDetails =(data)=>{
    console.log(data)
        const {chipSet,displaySize,memory,sensors,storage} = data.mainFeatures;
        const {Bluetooth,GPS,NFC,Radio,USB,WLAN} = data.others;
        const singleData = document.getElementById('singleData');
        singleData.innerHTML = `
            <h3 class="d-flex pb-3 justify-content-center mx-auto" >${data.brand}</h3>
            <img class="d-flex pb-3 justify-content-center mx-auto" src="${data.image}"  alt="..."/>
            <h4 class="d-flex pb-3 justify-content-center mx-auto">${data.name} - full Specification</h4>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Advance Features</th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Chipset</th>
                        <td>${chipSet}</td>
                    </tr>
                    <tr>
                        <th scope="row">Display Size</th>
                        <td>${displaySize}</td>
                    </tr>
                    <tr>
                        <th scope="row">Memory Size</th>
                        <td>${memory}</td>
                    </tr>
                    <tr>
                        <th scope="row">Release Date</th>
                        <td>${data.releaseDate !== "" ? data.releaseDate : 'no realse date'}</td>
                    </tr>
                    <tr>
                        <th scope="row">Sensors</th>
                        <td>
                        ${sensors.map(i=> `${i}`)}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Storage</th>
                        <td>${storage}</td>
                    </tr>
                </tbody>
            </table> 

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Others</th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Bluetooth</th>
                        <td>${Bluetooth}</td>
                    </tr>
                    <tr>
                        <th scope="row">GPS</th>
                        <td>${GPS}</td>
                    </tr>
                    <tr>
                        <th scope="row">NFC</th>
                        <td>${NFC}</td>
                    </tr>
                    <tr>
                        <th scope="row">Radio</th>
                        <td>${Radio}</td>
                    </tr>
                    <tr>
                        <th scope="row">USB</th>
                        <td>
                        ${USB}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">WLAN</th>
                        <td>${WLAN}</td>
                    </tr>
                </tbody>
            </table> 
        `
}

const errorMessage=()=>{
    const errorMessage = document.getElementById('textMessage');
    errorMessage.classList.remove('d-none');
    errorMessage.classList.add('d-flex');
    errorMessage.innerHTML =`<blink style="color: red;" id="blinkMessage">Search string not match!<span style="color: black;" id="blinkMessage">Search for like iphone, samsung, oppo</span></blink>`;  
    setTimeout(errorTimeout, 3000);  
}
const errorTimeout=()=>{
    const errorMessage = document.getElementById('textMessage');
    errorMessage.classList.add('d-none');
    errorMessage.classList.remove('d-flex');
}

