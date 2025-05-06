const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
const livros = JSON.parse(localStorage.getItem('livros')) || []

if (!usuario) {
  alert('Você precisa estar logado para acessar esta página.')
  window.location.href = '../login/index.html'
} else {
  const boasVindas = document.getElementById('nomeusuario')
  boasVindas.textContent = `Bem-vindo, ${usuario.username}!`
}

const botaoLogout = document.getElementById('buttonsair')
botaoLogout.addEventListener('click', () => {
  localStorage.removeItem('usuarioLogado')
  window.location.href = '../login/index.html'
})

const listaEmprestimos = document.getElementById('listaemprestados')

if (usuario.emprestimos && usuario.emprestimos.length > 0) {
    const todosLivros = JSON.parse(localStorage.getItem('livros')) || []
  
    usuario.emprestimos.forEach(emprestimo => {
      const livroDetalhado = todosLivros.find(l => l.titulo === emprestimo.titulo)
      if (!livroDetalhado) return
  
      const dataEmprestimo = new Date(emprestimo.dataEmprestimo)
      const prazoLimite = new Date(dataEmprestimo)
      prazoLimite.setDate(dataEmprestimo.getDate() + 14) // 14 dias depois
  
      const linha = document.createElement('tr')
      linha.innerHTML = `
        <td>${livroDetalhado.titulo}</td>
        <td>${livroDetalhado.autor}</td>
        <td>${livroDetalhado.ano}</td>
        <td>${livroDetalhado.genero}</td>
        <td>${prazoLimite.toLocaleDateString()}</td>
        <td>${livroDetalhado.disp ? 'Devolvido' : 'Pendente'}</td>
        <td><button onclick="devolverLivro('${livroDetalhado.titulo.replace(/'/g, "\\'")}')">Devolver</button></td>
      `
      listaEmprestimos.appendChild(linha)
    })
  } else {
    listaEmprestimos.innerHTML = '<tr><td colspan="7">Nenhum livro emprestado.</td></tr>'
  }
  
  function devolverLivro(titulo) {
    const confirmacao = confirm(`Deseja realmente devolver o livro "${titulo}"?`)
    if (!confirmacao) return
  
    // Atualiza a disponibilidade no catálogo de livros
    const livros = JSON.parse(localStorage.getItem('livros')) || []
    const livro = livros.find(l => l.titulo === titulo)
    if (livro) {
      livro.disp = true
      localStorage.setItem('livros', JSON.stringify(livros))
    }
  
    // Remove o livro da lista de empréstimos do usuário
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const usuarioIndex = usuarios.findIndex(u =>
      u.username === usuario.username &&
      u.matricula === usuario.matricula
    )
  
    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].emprestimos = usuarios[usuarioIndex].emprestimos.filter(e => e.titulo !== titulo)
      localStorage.setItem('usuarios', JSON.stringify(usuarios))
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarios[usuarioIndex]))
      alert(`Livro "${titulo}" devolvido com sucesso!`)
      location.reload() // recarrega a página para atualizar a tabela
    }
  }
  
  function pesquisarLivro() {
    const termoPesquisa = document.getElementById('pesquisa').value.toLowerCase()
    const listaLivros = document.getElementById('listaemprestados')
    listaLivros.innerHTML = ''
  
    const todosLivros = JSON.parse(localStorage.getItem('livros')) || []
  
    // Filtra os livros emprestados pelo usuário com base no termo de pesquisa
    const emprestimosFiltrados = usuario.emprestimos.filter(emprestimo => {
      const livro = todosLivros.find(l => l.titulo === emprestimo.titulo)
      if (!livro) return false
  
      return (
        livro.titulo.toLowerCase().includes(termoPesquisa) ||
        livro.autor.toLowerCase().includes(termoPesquisa) ||
        livro.genero.toLowerCase().includes(termoPesquisa)
      )
    })
  
    if (emprestimosFiltrados.length === 0) {
      listaLivros.innerHTML = '<tr><td colspan="7">Nenhum livro encontrado.</td></tr>'
      return
    }
  
    emprestimosFiltrados.forEach(emprestimo => {
      const livroDetalhado = todosLivros.find(l => l.titulo === emprestimo.titulo)
      const dataEmprestimo = new Date(emprestimo.dataEmprestimo)
      const prazoLimite = new Date(dataEmprestimo)
      prazoLimite.setDate(dataEmprestimo.getDate() + 14)
  
      const linha = document.createElement('tr')
      linha.innerHTML = `
        <td>${livroDetalhado.titulo}</td>
        <td>${livroDetalhado.autor}</td>
        <td>${livroDetalhado.ano}</td>
        <td>${livroDetalhado.genero}</td>
        <td>${prazoLimite.toLocaleDateString()}</td>
        <td>${livroDetalhado.disp ? 'Devolvido' : 'Pendente'}</td>
        <td><button onclick="devolverLivro('${livroDetalhado.titulo.replace(/'/g, "\\'")}')">Devolver</button></td>
      `
      listaLivros.appendChild(linha)
    })
  }
  

document.getElementById('pesquisa').addEventListener('input', pesquisarLivro)