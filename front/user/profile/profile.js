const jwt= localStorage.getItem('jwt')
async function AfficherProfile(){
    //finir la fonction
const main= document.querySelector('main')

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
    
if(user.id == id){
  main.innerHTML+=`
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
    <button onclick="unfollow('${user.id}')" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> Ne plus suivre </button>`
    :`<button onclick="follow('${user.id}')" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" >Suivre</button>`}
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
