async function CreatePublication(){
try{
   const description= document.querySelector('#description').value
   const image= document.querySelector('#image')
   const jwt=localStorage.getItem('jwt')

   
       const formData = new FormData();

       formData.append('image', image.files[0])
     
       const response = await fetch("http://localhost:3555/insertImage", {
         method: "POST",
         body: formData,
       })

       if (response.status === 200) {
           
       let data = await response.json()
         let uploadedImage = data.newFileName
       
       
    let publication ={
       image: uploadedImage,
       description: description
      
   }
   
   
   let request = {
       method: 'POST',
       headers: {
         'Content-type': 'application/json; charset=utf-8',
         Authorization: `Bearer ${jwt}`,
     },
       body: JSON.stringify(publication),
     }
const apiRequest = await fetch('http://localhost:3555/CreatePublication', request)

console.log(publication)
       if(apiRequest.status === 200){
         
    window.location.href = "../../home/home.html"
    }
  }    
}catch(error){
   console.log(error)
}
}