

const searchMobile = () =>{
    const searchText = document.getElementById('searchText');
    const foundText = searchText.value;
        if(foundText == ""){
            const textMessage = document.getElementById('textMessage');
            textMessage.classList.remove('d-none')
            textMessage.classList.add('d-flex')
        }else{
            const textMessage = document.getElementById('textMessage');
            textMessage.classList.remove('d-flex')
            textMessage.classList.add('d-none')
            fetch(`https://openapi.programming-hero.com/api/phones?search=${foundText}`)
                .then(res => res.json())
                .then(data => displayingMobiles(data.data))
        }
    }


const displayingMobiles = mobiles =>{
    for(let mobile of mobiles){
        console.log(mobile);
        // const allPhone = document.getElementById('proResult');
        const allPhone = document.getElementById('productResults');
        allPhone.classList.add('d-flex');
        allPhone.classList.remove('d-none');
        // console.log(allPhone.getElementsByTagName("img")[0].attributes("src"));
        

        //child div creation
        var parentDiv = document.createElement('div');
        parentDiv.classList.add('border');
        parentDiv.classList.add('border-1');
        parentDiv.classList.add('rounded-3');
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

        // create element button
        // var aTag = document.createElement('a');
        // aTag.classList.add('btn');
        // aTag.classList.add('btn-primary');
        // aTag.id = "detailsId";
        // aTag.setAttribute("onclick", "detailsOnClick()")
        // aTag.href = `${mobile.slug}`;
        // var buttonText = document.createTextNode('Details');
        // aTag.appendChild(buttonText);
        // innerChildDiv.appendChild(aTag);

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


const detailsOnClick =() =>{
//    const slug =  document.getElementById('detailsId').getAttribute('href');
const slug =  document.getElementsByClassName('buttonClass')[0].id;
  
    if(slug !== ""){
        // alert(slug)
        const cardTitle = document.getElementById('cardId').innerText;
        fetch(`https://openapi.programming-hero.com/api/phones?search=${cardTitle}`)
                    .then(res => res.json())
                    .then(data => singlePhone(data.data))
                    
    }else{
        alert('nothing found');
    }

    const singlePhone =detailForPhone=>{
        for(singleDetail of detailForPhone){
           if(slug === singleDetail.slug){
            const allPhone = document.getElementById('productResults');
            allPhone.classList.add('d-none');
            allPhone.classList.remove('d-flex')
            console.log('data found');
           }else{
               return false; 
           }
        }
    }
} 


