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
  <div class=" relative max-w-md my-10 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
  <div>
    <img id="avatar" src="http://localhost:3555${user.banniere}" alt="User Avatar" class="h-48 w-full object-cover">
  
  </div>
  <img class="h-24 w-24 absolute top-36 object-cover left-2 rounded-full ring-1 ring-black sm:h-32 sm:w-32" src="http://localhost:3555${user.avatar}" alt="">

  <div id="userDetails" class="text-center px-6 py-4">
    <h3 id="username" class="text-xl font-semibold text-gray-800">${user.pseudo}</h3>
    <p id="bio" class="text-sm font-medium text-gray-600"></p>
    <div class="flex justify-center mt-4">


      <div class='follow'>
        <p class="text-sm text-gray-600">Followers:</p>
        ${resultFollow[0].Profile == id?`
         <p id="followers" class="text-lg font-semibold text-gray-800">${resultFollow[0].nbFollower}</p>`
         :`<p id="followers" class="text-lg font-semibold text-gray-800">0</p>`}

       
        
      </div>
    </div>
    <div id="btnfollow">
    ${response.length > 0 ?`
    <button onclick="unfollow('${user.id}')" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> Ne plus suivre </button>`
    :`<button onclick="follow('${user.id}')" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" >Suivre</button>`}
   
    </div>
    </div>`
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