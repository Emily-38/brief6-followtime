const jwt = localStorage.getItem('jwt')
const main= document.querySelector('main')
async function header(){
    const header= document.querySelector('header')
    
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
   <!--SearchBar-->
   <div class="recherche w-full flex flex-rows justify-center shadow-md bg-gray-100 p-3"> 
       <p class="mt-2"><i class="fa-solid fa-magnifying-glass"></i></p>
       <input id="search-input" oninput="getAll()" class="block  px-4 py-2 text-gray-800  rounded-l-2xl  focus:outline-none" type="text" placeholder="Recherche User" autocomplete="off">
       <select class="bg-white rounded-r-2xl ">
       <option value="pseudo">Pseudo</option>
       <option value="email">Email</option>
       
   </select>
     <div id="dropdownDotsHorizontal" class="z-10 hidden absolute right-4/12 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
   <ul class="user py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
     lit
   </ul>
   </div>
       </div>
   <div>

   <!--profile user-->
   <img class="h-32 w-full object-cover lg:h-48" src="http://localhost:3555${user.banniere}" alt="">
 </div>
 <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
   <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
     <div class="flex">
       <img class="h-24 w-24 rounded-full ring-1 ring-black sm:h-32 sm:w-32" src="http://localhost:3555${user.avatar}" alt="User Avatar">
     </div>
     <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
       <div class="mt-6 min-w-0 flex-1 sm:hidden md:block">
         <h1 class="truncate text-2xl font-bold text-black">${user.pseudo}</h1>
       </div>
       <div class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
       <button type="button" onclick="home()" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
         
           <p class='ml-2'> Home </p>
         </button>
         <button type="button" onclick="updateUser()" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
         <i class="fa-solid fa-pen"></i>
           <p class='ml-2'> Modifier profile </p>
         </button>
         <button type="button" onclick="addPublication()" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
         <i class="fa-solid fa-plus"></i>
           <p class='ml-2'>Crée une publication<p>
         </button>
         <button type="button" onclick="logOut()" class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
         <i class="fa-solid fa-right-from-bracket"></i>
           <p class='ml-2'>Déconnexion<p>
         </button>
       </div>
     </div>
   </div>
   
   `
});    
}
header()
async function home(){
    window.location.href="../user/home/home.html"
}
async function addPublication(){
    window.location.href ="../user/publication/creationPublication/CreatePublication.html"
}
async function updateUser(){
    window.location.href ="../user/updateProfile/updateProfile.html"
}

async function allUser(event){

    main.innerHTML = "";
    main.classList.add('translate-x-1/2');
    
    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    const apiUser= await fetch('http://localhost:3555/allUser', request)
    const responseUser=await apiUser.json()
    setTimeout(()=>{
    main.innerHTML=""
    main.classList.remove('translate-x-1/2')
    responseUser.result.forEach(user => {
        main.innerHTML+=`
        <div class="max-w-md m-5 mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative ">
        <div class="relative">
          <img id="avatar" src="http://localhost:3555/${user.banniere}" alt="User Banniere" class="h-48 w-full object-cover">
        </div>
        <img class="absolute top-36 m-2 h-16 w-16 rounded-full ring-1 ring-black sm:h-16 sm:w-16" src="http://localhost:3555/${user.avatar}" alt="User Avatar">
        <div id="userDetails" class="text-center px-6 py-4">
          <h3 id="username" class="text-xl font-semibold text-gray-800">${user.pseudo}</h3>
          <div class="flex justify-center mt-4">
            <div>
              <p class="text-sm text-gray-600">Followers</p>
              <p id="followers" class="text-lg font-semibold text-gray-800">${user.follower}</p>
            </div>
            <div class="compte${user.userid} ml-6">
            <p class="text-sm text-gray-600">compte</p>
            ${user.isActive === 1 ?`<p id="active" class="text-lg font-semibold text-gray-800">Activer</p>
            </div>
            </div>
            <div class="compte m-2">
            <button class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onclick="DesactiverCompte('${user.userid}')">Désactiver</button>
            </div>
            `:
            `<p id="active" class="text-lg font-semibold text-gray-800">Désactiver</p>
               </div>
          </div>
          <div class="comptebtn${user.userid} m-2">
          <button class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onclick="ActiveCompte('${user.userid}')">Activer</button>
          </div>
            ` }
         
        </div>`
        
    });   
},"100") 
}

async function getAll(){
    
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

async function DesactiverCompte(id){
    const comptebtn= document.querySelector(`.comptebtn${id}`)
    const  compte= document.querySelector(`.compte${id}`)
    let request = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
   
    const apiCompte= await fetch(`http://localhost:3555/desactiveCompte/${id}`, request)
    const responseCompte= await apiCompte.json() 
    
    if(responseCompte.affectedRows=== 1){
        compte.innerHTML=` <p class="text-sm text-gray-600">compte</p>
        <p id="active" class="text-lg font-semibold text-gray-800">Désactiver</p>`
        comptebtn.innerHTML=`<button class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onclick="ActiveCompte('${id}')">Réactiver</button>`
    }
}
async function ActiveCompte(id){
    const comptebtn= document.querySelector(`.comptebtn${id}`)
    const  compte= document.querySelector(`.compte${id}`)
    let request = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    const apiCompte= await fetch(`http://localhost:3555/activeCompte/${id}`, request)
    const responseCompte= await apiCompte.json()
    if(responseCompte.affectedRows=== 1){
        compte.innerHTML=` <p class="text-sm text-gray-600">compte</p>
        <p id="active" class="text-lg font-semibold text-gray-800">Activer</p>`
        comptebtn.innerHTML=`<button class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onclick="DesactiverCompte('${id}')">Désactiver</button>`
    }

}
async function allPublication(){
    
 main.innerHTML = "";
    main.classList.add('translate-x-1/2');

    
   
    
   
    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    const apiPublications= await fetch('http://localhost:3555/allpublications', request)
    const responsePublications=await apiPublications.json() 
    setTimeout(()=>{
    main.classList.remove('translate-x-1/2');
    responsePublications.forEach(publication => {
        main.innerHTML+=`<div class="w-auto m-5 mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative">
        <div class="relative">
          <img id="avatar" src="http://localhost:3555/uploads/${publication.image}" alt="User Banniere" class="m-2 object-coverh-48 w-48 object-cover">
        </div>
        <div class="flex justify-center flex-col mt-4">
        <div class="w-48 m-2">
          <p id="followers" class="text-lg font-semibold text-gray-800">${publication.description}</p>
        </div>

        <div class=" m-2">
        <button class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onclick="deletePublication('${publication._id}')">supprimer</button>
        </div>
        </div> 
        `
    
    })
},"100")
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
async function logOut(){
    localStorage.clear()
    window.location.href="../../authentification/login/login.html"
  }