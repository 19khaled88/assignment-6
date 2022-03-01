

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
const displayingMobiles = mobile =>{
    console.log(mobile);
}



