
async function AfficherProfile(){
    //finir la fonction
const main= document.querySelector('main')
const jwt= localStorage.getItem('jwt')
  
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
const fetchUser= await fetch('http://localhost:3555/allUser',request)
const resultUser= await fetchUser.json()

resultUser.forEach(user => {
  console.log(id)
if(user.id == id){
  main.innerHTML+=`
  <div class="absolute top-1/4 left-1/4 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
  <div>
    <img id="avatar" src="http://localhost:3555/uploads/${user.image}" alt="User Avatar" class="h-48 w-full object-cover">
   
  </div>
  <div id="userDetails" class="text-center px-6 py-4">
    <h3 id="username" class="text-xl font-semibold text-gray-800"></h3>
    <p id="bio" class="text-sm font-medium text-gray-600"></p>
    <div class="flex justify-center mt-4">
      <div>
        <p class="text-sm text-gray-600">Followers</p>
        <p id="followers" class="text-lg font-semibold text-gray-800">nombreFollowers</p>
      </div>
    </div>
    <button>Suivre</button>
  </div>`
  }
});
}