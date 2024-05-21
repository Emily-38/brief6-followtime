const jwt = localStorage.getItem('jwt')

async function profile(){
    const formulaire= document.querySelector('.formulaire')
    const sidebar=document.querySelector('.sidebar')
    sidebar.classList.add('hidden')
    let request = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json; charset=utf-8',
           Authorization: `Bearer ${jwt}`,
       },
   }
   let apiRequest = await fetch('http://localhost:3555/users', request)
    let response= await apiRequest.json()
  

   
    formulaire.innerHTML=`
    <button onclick="retour()" ><i class="fa-solid fa-arrow-left"></i></button>
    <div class="flex flex-col justify-center contenaire mx-auto w-1/2">
<div class=' text-center  '> 

   <p class='font-bold'>Profile<p>
   <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="">
                  Photo de profile
            </label>
            <input class="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="avatar" type="file">
    
            <button onclick="photoDeProfile()" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> changer de photo de profile</button>
    </div>

    <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="">
            banniere
        </label>
        <input class="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="banniere" type="file" >
        <button onclick="banniere()" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> changer de photo banniere</button>
    </div>

    <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="">
            changer de pseudo
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="pseudo" type="text" >
        <button onclick='pseudo()' class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> changer de pseudo </button>
    </div>
    </div>
</div>`
   
}


async function photoDeProfile(){
    const images= document.querySelector('#avatar')
    const formData = new FormData();

    formData.append('image', images.files[0])
  
    const response = await fetch("http://localhost:3555/photoProfile", {
      method: "POST",
     
      body: formData,
    })
    if (response.status === 200) {
        console.log(response.status)
    let data = await response.json()
      let uploadedImage = data.newFileName
      const avatar={
        image:uploadedImage
    }
    let request = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(avatar),
    }

        const dbUpdate= await fetch(`http://localhost:3555/updateAvatar`, request)
        
        
       if(dbUpdate.status === 200){
        alert('photo de profile changer')
            window.location.reload()
        }
    }
}
async function banniere(){
    const images= document.querySelector('#banniere')
    const formData = new FormData();

    formData.append('image', images.files[0])
  
    const response = await fetch("http://localhost:3555/photoProfile", {
      method: "POST",
     
      body: formData,
    })
    if (response.status === 200) {
        console.log(response.status)
    let data = await response.json()
      let uploadedImage = data.newFileName
      const banniere={
        banniere:uploadedImage
    }
    let request = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(banniere),
    }

        const dbUpdate= await fetch(`http://localhost:3555/updateBanniere`, request)
        
        
       if(dbUpdate.status === 200){
        alert('photo de banniere changer')
            window.location.reload()
        }
    }
}

async function pseudo(){
const pseudo=document.querySelector('#pseudo').value
const pseudoUser={
    pseudo:pseudo
}
let request = {
    method: 'PATCH',
    headers: {
        'Content-type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(pseudoUser),
}

    const dbUpdate= await fetch(`http://localhost:3555/updatePseudo`, request)
    
    
   if(dbUpdate.status === 200){
    alert('le pseudo a été changé')
        window.location.reload()
    }


}

async function confidentialiter(){
    const formulaire= document.querySelector('.formulaire')
    const sidebar=document.querySelector('.sidebar')
    sidebar.classList.add('hidden')
    
    let request = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json; charset=utf-8',
           Authorization: `Bearer ${jwt}`,
       },
   }
   let apiRequest = await fetch('http://localhost:3555/users', request)
    let response= await apiRequest.json()
    formulaire.innerHTML=`
    <button onclick="retour()" ><i class="fa-solid fa-arrow-left"></i></button>
    <div class="flex flex-col justify-center contenaire mx-auto w-1/2">
<div class=' text-center  '> 

   <p class='font-bold'>Confidentialiter<p>
   <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="">
                  confidentialité du compte
            </label>
            <select class=" bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confidentialité">
                <option value="3">Privé</option>
                <option value="4">Public</option>
            </select>
            <button onclick="updateconfidentialiter()" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> changer de confidentialité </button>
    </div>

    <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="">
            changer d'email
        </label>
        <input class="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" >
        <button onclick="email()" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> changer votre email </button>
    </div>

    <div class="mb-6">
        
        <button onclick='password()' class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> changer de mot de passe </button>
    </div>
</div>`


}

async function updateconfidentialiter(){
    const confidentialiter=document.querySelector('#confidentialité').value
    const confidentialiterUser={
        confidentialiter:confidentialiter
    }
    let request = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(confidentialiterUser),
    }
    
        const dbUpdate= await fetch(`http://localhost:3555/updateConfidentialiter`, request)
        
        
       if(dbUpdate.status === 200){
        alert('la confidentialitée du compte a été changée')
            window.location.reload()
        }
}
async function email(){
    const email=document.querySelector('#email').value
    const emailUser={
        email:email
    }
    let request = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(emailUser),
    }
    
        const dbUpdate= await fetch(`http://localhost:3555/use-change-email`, request)
        
        
       if(dbUpdate.status === 200){
        alert("un mail vous a été envoyer pour confirmer votre changement d'email")
            window.location.reload()
        }
}
async function password(){
    
    let request = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    const dbUpdate= await fetch(`http://localhost:3555/user-change-password`, request)
    console.log(dbUpdate.status)
    if(dbUpdate.status === 200){
        console.log('click')
        alert("un mail vous a été envoyer pour changer votre mot de passe")
            window.location.reload()
        }

}
async function retour(){
    const sidebar=document.querySelector('.sidebar')
    sidebar.classList.remove('hidden')
   
    
    
}
async function retourHome(){
    window.location.href="../home/home.html "
}