
localStorage.removeItem('publication')
localStorage.removeItem('profile')


async function header(){
     const header= document.querySelector('header')
     const jwt = localStorage.getItem('jwt')
     let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    let apiRequest = await fetch('http://localhost:3555/users', request)
     let response= await apiRequest.json()
  
 response.forEach(user => {
    
    header.innerHTML=`
    <div class="recherche w-full flex flex-rows justify-center shadow-md bg-gray-100 p-3"> 
        <p class="mt-2"><i class="fa-solid fa-magnifying-glass"></i></p>
        <input id="search-input" oninput="getAll()" class="block  px-4 py-2 text-gray-800  rounded-l-2xl  focus:outline-none" type="text" placeholder="Recherche User" autocomplete="off">
        <select class="bg-white rounded-r-2xl ">
        <option value="email">Email</option>
        <option value="pseudo">Pseudo</option>
    </select>
      <div id="dropdownDotsHorizontal" class="z-10 hidden absolute right-4/12 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <ul class="user py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
      lit
    </ul>
    </div>
        </div>
    <div>
    <img class="h-32 w-full object-cover lg:h-48" src="http://localhost:3555${user.banniere}" alt="">
  </div>
  <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
      <div class="flex">
        <img class="h-24 w-24 rounded-full ring-1 ring-black sm:h-32 sm:w-32" src="http://localhost:3555/${user.avatar}" alt="">
      </div>
      <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
        <div class="mt-6 min-w-0 flex-1 sm:hidden md:block">
          <h1 class="truncate text-2xl font-bold text-black">${user.pseudo}</h1>
        </div>
        <div class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button type="button" onclick="updateUser()" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <i class="fa-solid fa-pen"></i>
            <p class='ml-2'> Modifier profile </p>
          </button>
          <button type="button" onclick="addPublication()" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <i class="fa-solid fa-plus"></i>
            <p class='ml-2'>Crée une publication<p>
          </button>
        </div>
      </div>
    </div>
    <div class="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
      <h1 class="truncate text-2xl font-bold text-black">${user.pseudo}</h1>
    </div>
    `
 });    
 }
 header()

async function updateUser(){
    window.location.href ="../updateProfile/updateProfile.html"
}

async function addPublication(){
    window.location.href ="../publication/creationPublication/CreatePublication.html"
}

async function publication(){
const main= document.querySelector('main')
const jwt = localStorage.getItem('jwt')
let request = {
   method: 'GET',
   headers: {
       'Content-Type': 'application/json; charset=utf-8',
       Authorization: `Bearer ${jwt}`,
   },
}

let apiFollow = await fetch('http://localhost:3555/followersasFollow', request)
let responseFollow= await apiFollow.json()

//revoir le authdata
for(let follow of responseFollow){
console.log(follow.cible_id)
   let apiPublication = await fetch(`http://localhost:3555/getpublicatonbyid/${follow.cible_id}`, request)
  let responsePublication= await apiPublication.json()

  let apiUser = await fetch(`http://localhost:3555/userbyid/${follow.cible_id}`, request)
  let responseUser= await apiUser.json()
 
  responsePublication.forEach(publication => {
    
    main.innerHTML +=`

    

<div class="relative mx-auto mt-16 grid grid-cols-1 max-w-2xl  grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
<figure class="rounded-2xl  bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-start-1">
  <figcaption class="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
    <img class="h-10 w-10 flex-none object-cover rounded-full bg-gray-50" src="http://localhost:3555${responseUser[0].avatar}" alt="">
    <div class="flex-auto">
    
      <div class="font-semibold">${responseUser[0].pseudo}</div>
    </div>

    <div class="relative">
    <button onclick="icons('${publication._id}')" class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
  <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
  </svg>
</button>

<!-- Dropdown menu -->
<div id="dropdownDotsHorizontal${publication._id}" class="z-10 absolute right-1 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
    <button onclick="modifier('${publication._id}')" class="w-full"><li class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Modifier</button>
      
      
      </li>
      <button onclick="deletePublication('${publication._id}')" class="w-full"><li class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
       Supprimer </button>
      </li>

    </ul>
   
</div>
    </div> 
    
  </figcaption>
  <img class="w-full"src="http://localhost:3555/uploads/${publication.image}">
 <button onclick="redirectionPublication('${publication._id}')">
  <div class="p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8">
    <p>${publication.description}</p>
  </div>
  </button>

  ${publication.likes.includes(responseUser[0].id)=== true ? `<div class="flex justify-between ">
  <div class="interaction${publication._id} m-2 ">
  <button onclick="disliketoggle('${publication._id}')"  class=" m-2"><i id="like" class="fa-solid fa-heart text-red-600 "></i></button>
        <button onclick="commenter()"><i class="fa-solid fa-comments"></i></button>
  </div>`
   :`<div class="flex justify-between ">
  <div class="interaction${publication._id} m-2 ">
      <button onclick="liketoggle('${publication._id}')"  class="add m-2"><i id="like" class="fa-solid fa-heart  "></i></button>
      <button onclick="commenter()"><i class="fa-solid fa-comments"></i></button>
  </div>` }
  </div>
  <div id="commentaire"class="commentaire hidden max-w-2xl left-1/4 bottom-0 gap-8 text-sm leading-6 text-gray-900 xl:mx-0 xl:max-w-none">
        <div class=" flex flex-col rounded-2xl bg-slate-200 shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1 ">
            <textarea id="description" class="m-3"></textarea>
             <button onclick="addCommentaire('${publication._id}')" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Envoyer</button>
        </div>
    </div>
</figure>
</div> 
`
})
}
}
publication()

async function getAll(){
  const jwt = localStorage.getItem('jwt')
  const select=document.querySelector('select').value
  const searchInput = document.querySelector('#search-input').value;
  const users=document.querySelector('.user')
const dropdow=document.querySelector('#dropdownDotsHorizontal')
console.log(select )
if( !searchInput){
    dropdow.classList.add("hidden")
  }
  else if (select == 'email' && searchInput.length >0 ) {
 
    let request = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${jwt}`,
      },
    }  
    
      let apiUser = await fetch(`http://localhost:3555/searchUserByEmail/${searchInput}`, request)
      let responseUser= await apiUser.json()
       
    if(apiUser.status === 200 ){
        
    dropdow.classList.remove('hidden')
        users.innerHTML=""
    
     responseUser.forEach(user =>{
      users.innerHTML+=`<li><button onclick="redirectionProfile('${user.id}')">
      <div class="flex flex-row items-center">
      <img src="http://localhost:3555${user.avatar}" class="w-12 object-cover h-12 rounded-full"> <p class="m-2">${user.pseudo}</p>
      </div
      </button>
      </li>
      `
     })
    } 
      }

else if (select == 'pseudo' && searchInput.length >0 ) {
 
let request = {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${jwt}`,
  },
}  

  let apiUser = await fetch(`http://localhost:3555/searchUser/${searchInput}`, request)
  let responseUser= await apiUser.json()
   
if(apiUser.status === 200 ){
    
dropdow.classList.remove('hidden')
    users.innerHTML=""

 responseUser.forEach(user =>{
  users.innerHTML+=`<li><button onclick="redirectionProfile('${user.id}')">
  <div class="flex flex-row items-center">
  <img src="http://localhost:3555${user.avatar}" class="w-12 object-cover h-12 rounded-full"> <p class="m-2">${user.pseudo}</p>
  </div>
  </button>
  </li>
  `
 })
} 

  }
}

async function redirectionProfile(id){
  localStorage.setItem('profile', id)
  window.location.href="../profile/profile.html"
}
async function modifier(id){
    localStorage.setItem('publication',id)
window.location.href="../publication/modifierPublication/modifierPublication.html"
}
async function deletePublication(id){
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
    await fetch(`http://localhost:3555/publicationDelete/${id}`, request)
   
    window.location.reload()
    
}
async function icons(id){
  const menu= document.querySelector(`#dropdownDotsHorizontal${id}`)
          menu.classList.toggle('hidden')
}

async function commenter(){
    const commentaire= document.querySelector('.commentaire')
    commentaire.classList.toggle('hidden')
    window.location.href="#commentaire"
}

async function addCommentaire(publication_id){
    try{
const description = document.querySelector('#description').value
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

async function redirectionPublication(publication_id){
    localStorage.setItem('publication',publication_id)
    window.location.href="../publication/readPublication/readPublication.html"
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