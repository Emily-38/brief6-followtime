 const publication_id= localStorage.getItem('publication')
   const jwt=localStorage.getItem('jwt')

async function affichagePublication(){
  

const description=document.querySelector('#description')

const publicationById= await fetch(`http://localhost:3555/publicationById/${publication_id}`,{
    method: 'GET',
    headers: {
        'Content-type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${jwt}`,
    },
    
})
let response = await publicationById.json()
description.value =response.description    

}
affichagePublication()




async function ModifierPublication(){
    try{
        const description=document.querySelector('#description').value
    const publication={
        description:description
    }
    let request = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(publication),
    }

        const dbUpdate= await fetch(`http://localhost:3555/publicationUpdate/${publication_id}`, request)
        
        
       if(dbUpdate.status === 200){
        localStorage.removeItem('publication')
             window.location.href = '../../home/home.html'
        }else{
            window.location.reload()
        }
    
    
}catch(err){
    console.log(err);
}
}
