const publication_id=localStorage.getItem('publication')
const jwt= localStorage.getItem('jwt')

async function publication(){
const publicationdiv=document.querySelector('.publication')
    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
     }
     let RequestPublication = await fetch(`http://localhost:3555/publicationById/${publication_id}`, request)
     let response= await RequestPublication.json()

     let RequestUser= await fetch(`http://localhost:3555/allUser`, request)
     let users= await RequestUser.json()

     let RequestUsers= await fetch(`http://localhost:3555/users`, request)
     let userCourant= await RequestUsers.json()

     

 
users.forEach(user => {
  console.log(user)
        if(user.id===response.user_id){
      publicationdiv.innerHTML +=`
        <div class=" mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
            <figure class="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
    
    <figcaption class="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
   <button onclick="Profile('${user.id}')">
    <img class="h-10 w-10 flex-none object-cover rounded-full bg-gray-50" src="http://localhost:3555/${user.avatar}" alt="">
    </button>
    <div class="flex-auto">
    
    <div class="font-semibold">${user.pseudo}</div>
    </div>
    ${userCourant[0].id === response.user_id ?` 
    <div class="relative">
    <button onclick="icons('${response._id}')" class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
  <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
  </svg>
</button>

<!-- Dropdown menu -->
<div id="dropdownDotsHorizontal${response._id}" class="z-10 absolute right-1 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
      <a href="../modifierPublication/modifierPublication.html" class="w-full "><li class="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
      Modifier</a>
      
      </li>
      <button onclick="deletePublication()" class="w-full"><li class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
       Supprimer </button>
      </li>

    </ul>
   
</div>
    </div> `:""}
  </figcaption>
            
            <img class='w-full' src="http://localhost:3555/uploads/${response.image}">
            
                <div class="p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8">
                    <p>${response.description}</p>
                </div>

                ${response.likes.includes(userCourant[0].id)=== true ? `
                <div class="flex justify-between ">
                <div class="interaction${response._id} m-2 ">
                <button onclick="disliketoggle('${response._id}')"  class=" m-2">
                <i id="like" class="fa-solid fa-heart text-red-600 "></i>
                </button>
                    <button onclick="commenter()"><i class="fa-solid fa-comments"></i></button>
                </div>`
                 :`<div class="flex justify-between ">
                <div class="interaction${response._id} m-2 ">
                    <button onclick="liketoggle('${response._id}')"  class="add m-2"><i id="like" class="fa-solid fa-heart  "></i></button>
                    <button onclick="commenter()"><i class="fa-solid fa-comments"></i></button>
                </div>` }

            </figure>
        </div>
</div>
      `
}      
});
}
publication()

async function deletePublication(){
  const jwt= localStorage.getItem('jwt')

  if(!jwt){
      console.log('jwt invalide')
  }

  let request = {
      method: 'DELETE',
      headers: {
          'Content-type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${jwt}`,
      },
  }
  await fetch(`http://localhost:3555/publicationDelete/${publication_id}`, request)
 
  window.location.href='../../home/home.html'
  
}
async function commentaire(){
    const commentairediv=document.querySelector('.commentaire')
        let request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${jwt}`,
            },
         }
         let RequestPublication = await fetch(`http://localhost:3555/Commentaire/${publication_id}`, request)
         let response= await RequestPublication.json()

         let RequestUser= await fetch(`http://localhost:3555/allUser`, request)
            let users= await RequestUser.json()

let RequestUsers= await fetch(`http://localhost:3555/users`, request)
     let userCourant= await RequestUsers.json()


 
         response.forEach(commentaire => {
            users.forEach(user=>{
                if (commentaire.user_id===user.id) {
                    
                
          
         
         commentairediv.innerHTML+=`
         
         <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">

          <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
          <button onclick="Profile('${user.id}')">
            <img src="http://localhost:3555/${user.avatar}" alt="User Avatar" class="w-12 object-cover h-12 rounded-full">
          </button>
            </div>
         <div class="flex-1">
           <h2 class="text-lg font-semibold">${user.pseudo}</h2>
           <p class="text-gray-600">${commentaire.description}</p>
         </div>


         ${userCourant[0].id=== commentaire.user_id?` <div class="m-2">
         


         

<button onclick="icons('${commentaire._id}')" class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
  <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
  </svg>
</button>

<!-- Dropdown menu -->
<div id="dropdownDotsHorizontal${commentaire._id}" class="z-10 absolute right-4 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
     <button onclick="afficherCommentaire('${commentaire._id}')" class="w-full"><li class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
      Modifier
      
      </li></button>
      <button class="w-full" onclick="commentaireDelete('${commentaire._id}')"><li class="block px-4 py-2 text-sm  text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
       Supprimer 
      </li></button>

    </ul>
   
</div>
    </div>`:""}
                 
         
       </div>`
     }
    })
        });
}
  commentaire()
async function commenter(){
    const commentaire= document.querySelector('.addCommentaire')
    commentaire.classList.toggle('hidden')
}
async function addCommentaire(){
  try{
const description = document.querySelector('#descriptionCommentaire').value
const jwt= localStorage.getItem('jwt')

let commentaire={
  description:description
}

let request = {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${jwt}`,
},
  body: JSON.stringify(commentaire),
}
const apiRequest = await fetch(`http://localhost:3555/createCommentaire/${publication_id}`, request)
  if(apiRequest.status === 200){
      alert('commentaire ajouter avec succes')
         window.location.reload() 
        
      
}
}    
catch(error){
console.log(error)
}
}
async function afficherCommentaire(id){
    const Updatecommentaire= document.querySelector('#modifierCommentaire')
    Updatecommentaire.classList.toggle('hidden')
    localStorage.setItem('commentaire', id)
    
}
async function commentaireUpdate(){
  try{
    const description = document.querySelector('#description').value
    const jwt= localStorage.getItem('jwt')
    const commentaire_id=localStorage.getItem('commentaire')    
    let commentaire={
        description:description
    }
    
    let request = {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${jwt}`,
      },
        body: JSON.stringify(commentaire),
      }
    const apiRequest = await fetch(`http://localhost:3555/commentaireUpdate/${commentaire_id}`, request)
        if(apiRequest.status === 200){
          localStorage.removeItem('commentaire')
            alert('commentaire modifier avec succes')
               window.location.reload() 
     }
    }    
    catch(error){
    console.log(error)
    }
}
async function commentaireDelete(id){
  const jwt= localStorage.getItem('jwt')

  if(!jwt){
      console.log('jwt invalide')
  }

  let request = {
      method: 'DELETE',
      headers: {
          'Content-type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${jwt}`,
      },
  }
  await fetch(`http://localhost:3555/commentairedelete/${id}`, request)
 
  window.location.reload()

}
async function icons(id){
          const menu= document.querySelector(`#dropdownDotsHorizontal${id}`)
          menu.classList.toggle('hidden')

}
async function liketoggle(id){
  const btnlike= document.querySelector('#like')
  const interaction=document.querySelector(`.interaction${id}`)
    const jwt= localStorage.getItem('jwt')
  
    if(!jwt){
        console.log('jwt invalide')
    }
    let request = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
      }
  
    const responselike = await fetch(`http://localhost:3555/like/${id}`, request)
  
  if(responselike.status=== 200){
  interaction.innerHTML= `
  <button onclick="disliketoggle('${id}')"  class=" m-2"><i id="like" class="fa-solid fa-heart text-red-600 "></i></button>
          <button onclick="commenter()"><i class="fa-solid fa-comments"></i></button>
  `
  
  }
  
}
  async function disliketoggle(id){
    const interaction=document.querySelector(`.interaction${id}`)
    const jwt= localStorage.getItem('jwt')
  
    if(!jwt){
        console.log('jwt invalide')
    }
    let request = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        }
    const dislike = await fetch(`http://localhost:3555/dislike/${id}`, request)
    if(dislike.status===200){
      interaction.innerHTML=`<button onclick="liketoggle('${id}')"  class="add m-2"><i id="like" class="fa-solid fa-heart  "></i></button>
      <button onclick="commenter()"><i class="fa-solid fa-comments"></i></button>`
    }
  
}
async function Profile(id){
    
    localStorage.setItem('profile', id)
    window.location.href="../../profile/profile.html"
     
 }
  