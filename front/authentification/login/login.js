async function login() {
    const email= document.querySelector('#Email').value
    const password= document.querySelector('#password').value

    let user = {
        email: email,
        password: password,
    }

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
    }

    let apiRequest = fetch('http://localhost:3555/login', request)
    let response = await apiRequest
     const data = await response.json()
    
        if (response.status === 200) {
            let jwt = data.jwt
            let role = data.user
    
            window.localStorage.setItem('jwt', jwt)
             
            if (role === 'admin') {
                window.location.href = '../admin/admin.html'
            } else {
                window.location.href = '../Home/Home.html'
            }
        }
}