const select = document.querySelector('#confidentialité')

async function selectConfidentialité(){
let confidentialiter = await fetch('http://localhost:3555/confidentialiter')
let response = await confidentialiter.json()


response.forEach(status => {
  
    select.innerHTML +=`<option value="${status.id}">${status.status}</option>`
   
});

}
selectConfidentialité()

async function register(){
   try{
     const email= document.querySelector('#Email').value
    const password= document.querySelector('#password').value
    const pseudo= document.querySelector('#Pseudo').value
    const image= document.querySelector('#Image')

    
        const formData = new FormData();

        formData.append('image', image.files[0])
      
        const response = await fetch("http://localhost:3555/photoProfile", {
          method: "POST",
         
          body: formData,
        })
        if (response.status === 200) {
            console.log(response.status)
        let data = await response.json()
          let uploadedImage = data.newFileName
        
        
     let user ={
        email:email,
        password:password,
        pseudo: pseudo,
        image: uploadedImage,
        confidentialité:parseInt(select.value)
    }
    
    
    let request = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
      },
        body: JSON.stringify(user),
      }
 const apiRequest = await fetch('http://localhost:3555/register', request)
console.log(apiRequest.status)

        if(apiRequest.status === 200){
            console.log('dans le status 200')
     window.location.href = "../login/login.html"
     }
   }    
 }catch(error){
    console.log(error)
 }

}