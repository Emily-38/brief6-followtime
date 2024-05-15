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



    console.log(response.user_id)
users.forEach(user => {
        if(user.id===response.user_id){
      publicationdiv.innerHTML +=`
        <div class="relative mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
            <figure class="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
    
    <figcaption class="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
    <img class="h-10 w-10 flex-none rounded-full bg-gray-50" src="http://localhost:3555/uploads/${user.image}" alt="">
    <div class="flex-auto">
    
    <div class="font-semibold">${user.pseudo}</div>
    </div>
    
  </figcaption>
            
            <img src="http://localhost:3555/uploads/${response.image}">
            
                <div class="p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8">
                    <p>${response.description}</p>
                </div>
 
            </figure>
        </div>
      `
}      
});
}
publication()

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


         response.forEach(commentaire => {
            users.forEach(user=>{
                if (commentaire.user_id===user.id) {
                    
                
           
         
         commentairediv.innerHTML+=`
         <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
         <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
           <img src="http://localhost:3555/${user.avatar}" alt="User Avatar" class="w-12 h-12 rounded-full">
         </div>
         <div class="flex-1">
           <h2 class="text-lg font-semibold">${user.pseudo}</h2>
           <p class="text-gray-600">${commentaire.description}</p>
         </div>
       </div>`
     }
    })
        });
        }
        commentaire()