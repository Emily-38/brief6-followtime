async function profile(){
    const formulaire= document.querySelector('.formulaire')
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
   
    formulaire.innerHTML=`
<div class='text-center'>
   <p class='font-bold'>Profile<p>
   <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="">
                  Pseudo
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
    </div>
</div>`
});    
}
header()