async function changePassword(){
try{
    const urlParams=new URLSearchParams(window.location.search)
const token = urlParams.get('token')
const password= document.querySelector('#password').value
const newPassword={

    password:password
}
let request = {
    method: 'PATCH',
    headers: {
        'Content-type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newPassword),
}

    const dbUpdate= await fetch(`http://localhost:3555/updatePassword/${token}`, request)
    
    
   if(dbUpdate.status === 200){
         window.location.href = '../../../authentification/login/login.html'
    }else{
        alert('erreur au moment du changement de mot de passe veuillez recommencer')
        window.location.reload()
    }


}catch(err){
console.log(err);
}

}


