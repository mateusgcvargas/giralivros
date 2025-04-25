const cadform = document.getElementById('cadastroform')
cadform.addEventListener('submit', function (event){
    event.preventDefault()
    
    //variáveis do input da tela de registro

    const reguser = document.getElementById('username').value
    const regmat = document.getElementById('matricula').value
    const regpsswd = document.getElementById('password').value

    //simulação de bancos de dados de usuários
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

    const usuarioExistente = usuarios.find(user => 
        user.username === reguser && user.password === regpsswd && user.matricula === regmat
      )
  
      if (usuarioExistente) {
        alert('Este usuário já existe!')
      } else {
        usuarios.push(
          {username: reguser, password: regpsswd, matricula: regmat}
        )
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        alert("Cadastro realizado com sucesso!")
        
        window.location.href = "../login/index.html"
      }
      console.log(usuarios)
})

