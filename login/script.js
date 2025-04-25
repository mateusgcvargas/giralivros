//simulação banco de dados
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

// script para o login de usuário

const loginForm = document.getElementById('login-box')


loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;

  const usuarioValido = usuarios.find(user =>
    user.username === email && user.password === password
  );

  if (usuarioValido) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido));
    window.location.href = '../paguser/index.html';
  } else {
    alert('Usuário ou senha inválidos!');
  }
})

function pagCad(){
  const pagcad = document.getElementById("register-btn")

  if (pagcad){
    window.location.href = '../cadastro/index.html'
  }
}