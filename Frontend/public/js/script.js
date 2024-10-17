document.getElementById('loginForm').addEventListener('submit', submitLogin);

function submitLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Application-Key': 'TUa8ce2d039ad7aeafd9ab6e229473ad9bf30e29ae6737b0f991266fb1544d5b29d1bf2ef2067e4a7254b126e385a722d6'
      },
      body: JSON.stringify({ 
        UserName :username, 
        PassWord: password 
      })
    })
    .then(response => response.json())
    .then(data => {
      const messageElement = document.getElementById('message');
      if(data.message === 'Success'){
        messageElement.innerHTML = `
          <p>${data.message}</p>
          <p>Username: ${data.username}</p>
          <p>Email: ${data.email}</p>
          <p>Display Name: ${data.displayname_en}</p>
          <p>Faculty: ${data.faculty}</p>
        `;
      } else {
        messageElement.innerText = 'Login status: ' + data.message;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('message').innerText = 'An error occurred: ' + error.message;
    });
  }


