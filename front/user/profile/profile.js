const jwt= localStorage.getItem('jwt')
async function AfficherProfile(){
const header= document.querySelector('header')

const id= localStorage.getItem('profile')
  
    if(!jwt){
        console.log('jwt invalide')
    }
    let request = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
      }
const fetchUser= await fetch(`http://localhost:3555/allUser`,request)
const resultUser= await fetchUser.json()

const fetchFollow= await fetch(`http://localhost:3555/allUserPlusFollowers/${id}`,request)
const resultFollow= await fetchFollow.json()

const FollowExist= await fetch(`http://localhost:3555/followByAuth/${id}`,request)
const response=await FollowExist.json()

resultUser.forEach(user => {
    
if(user.userid == id){
  header.innerHTML+=`
  <div>
    <img class="h-32 w-full object-cover lg:h-48" src="http://localhost:3555/${user.banniere}" alt="">
  </div>
  <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
      <div class="flex">
        <img class="h-24 w-24 object-cover rounded-full ring-1 ring-black sm:h-32 sm:w-32" src="http://localhost:3555/${user.avatar}" alt="">
      </div>
      <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
        <div class="mt-6 min-w-0 flex-1 sm:hidden md:block">
          <h1 class="truncate text-2xl font-bold text-black">${user.pseudo}</h1>
        </div>
        <div class='follow '>
        <p class="text-sm text-gray-600">Followers:</p>
        ${resultFollow[0].Profile == id?`
         <p id="followers" class="text-lg font-semibold text-gray-800">${resultFollow[0].nbFollower}</p>`
         :`<p id="followers" class="text-lg font-semibold text-gray-800">0</p>`}
      </div>
        <div class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
    </div>
    <div id="btnfollow">
    ${response.length > 0 ?`
    <button onclick="unfollow('${user.userid}')" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> Ne plus suivre </button>`
    :`<button onclick="follow('${user.userid}')" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" >Suivre</button>`}
    </div>
    </div>
        </div>
      </div>
    </div>
    <div class="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
      <h1 class="truncate text-2xl font-bold text-black">${user.pseudo}</h1>
    </div>


      `
  }
})
}
AfficherProfile()

async function follow(id){
const btnfollow=document.querySelector('#btnfollow')

let request = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${jwt}`,
    },
  }

const addfollow= await fetch(`http://localhost:3555/following/${id}`,request)
if(addfollow.status===200){
btnfollow.innerHTML=`
<button onclick="unfollow('${id}')" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> Ne plus suivre </button>`
}


}
async function unfollow(id){
   
    let request = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
      }
    const unfollow= await fetch(`http://localhost:3555/unfollow/${id}`, request)

if(unfollow.status===200){
alert('vous ne suiver plus se compte')
window.location.reload()
}
}

async function affichePpublication(){
const main=document.querySelector('main')
const id= localStorage.getItem('profile')
if(!jwt){
  console.log('jwt invalide')
}
let request = {
  method: 'GET',
  headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${jwt}`,
  },
}

const FollowExist= await fetch(`http://localhost:3555/followByAuth/${id}`,request)
const response=await FollowExist.json()

const fetchUser= await fetch(`http://localhost:3555/userbyid/${id}`,request)
const resultUser= await fetchUser.json()

const fetchPublication= await fetch(`http://localhost:3555/getpublicatonbyid/${id}`,request)
const resultPublication= await fetchPublication.json()

resultPublication.forEach(publication=>{
console.log(response )
if(resultUser[0].confidentialité_id === 4 || response.length === 1 ){

  main.innerHTML +=`

    

  <div class="relative mx-auto mt-16 grid grid-cols-1 max-w-2xl  grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
  <figure class="rounded-2xl  bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-start-1">
    <figcaption class="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
     <button onclick="redirectionProfile('${resultUser[0].id}')">
      <img class="h-10 w-10 flex-none object-cover rounded-full bg-gray-50" src="http://localhost:3555${resultUser[0].avatar}" alt="">
      </button>
      <div class="flex-auto">
      
        <div class="font-semibold">${resultUser[0].pseudo}</div>
      </div>
   
    </figcaption>
    <img class="w-full"src="http://localhost:3555/uploads/${publication.image}">
   <button onclick="redirectionPublication('${publication._id}')">
    <div class="p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8">
      <p>${publication.description}</p>
    </div>
    </button>
  
    ${publication.likes.includes(resultUser[0].id)=== true ? `<div class="flex justify-between ">
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
}else{
  
  main.innerHTML +=`<p class='text-bold text-gray-400 text-center'>Ce compte est privé</p>`

}

})
}
affichePpublication()
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
