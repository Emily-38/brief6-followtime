async function changeEmail(){
    try{
        const urlParams=new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    let request = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${token}`,
        }
    }
    
        const dbUpdate= await fetch(`http://localhost:3555/updateEmail/${token}`, request)
        
        
       if(dbUpdate.status === 200){
        setTimeout(()=>{
            window.location.href="../../home/home.html"
        },'1000')            
        }else{
            alert('erreur au moment du changement de mot de passe veuillez recommencer')
            window.location.reload()
        }
    
    
    }catch(err){
    console.log(err);
    }
    
    }
    changeEmail()
    
    
    