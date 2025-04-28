//Array de todos os livros
const livros = JSON.parse(localStorage.getItem('livros')) || []

//Todos os livros atualmente disponíveis por padrão
const catlivros = [
    {titulo: "Fahrenheit 451", autor:"Ray Bradbury", ano:"1953", genero:"Mistério", disp:true },
    {titulo: "Não Pisque", autor:"Stephen King", ano:"2025", genero:"Mistério", disp:true },
    {titulo: "1984", autor:"George Orwell", ano:"", genero:"Sci-Fi", disp:true },
    {titulo: "Duna", autor:"Frank Herbert", ano:"1965", genero:"Sci-Fi", disp:true },
    {titulo: "O Hobbit", autor:"J.R.R Tolkien", ano:"1937", genero:"Fantasia", disp:true },
    {titulo: "O Senhor dos Anéis", autor:"J.R.R. Tolkien", ano:"1954", genero:"Fantasia", disp:true },
    {titulo: "O Grande Gatsby", autor:"F. Scott Fitzgerald", ano:"1925", genero:"Romance", disp:true },
    {titulo: "Romeu e Julieta", autor:"William Shakespeare", ano:"1597", genero:"Romance", disp:true },
    {titulo: "O Sol É Pra Todos", autor:"Harper Lee", ano:"1960", genero:"Drama", disp:true },
    {titulo: "Hamlet", autor:"William Shakespeare   ", ano:"1623", genero:"Drama", disp:true },
]

livros.push(...catlivros)

localStorage.setItem('livros', JSON.stringify(livros))

//função de empréstimo de livro
//quando o título é inserido, seja em upper ou lowercase, ele puxa o titulo
//do objeto e seta a disponibilidade como false
function emprestarLivro(titulo){
    const livros = JSON.parse(localStorage.getItem('livros')) || []
    const livro = livros.find(l => l.titulo.toLowerCase() === titulo.toLowerCase())
    if (!livro){
        alert ("Livro não encontrado.")
    }
    if (!livro.disp) {
        alert("Livro não está disponível.")
    }
    else{
    livro.disp = false
    alert(`O livro ${livro.titulo} foi emprestado.`)
    localStorage.setItem('livros', JSON.stringify(livros))
    renderizarTabela()
}}

function renderizarTabela() {
    const listaLivros = document.getElementById('listaLivros')
    listaLivros.innerHTML = '' // limpa a tabela antes de renderizar
    
    //adiciona os dados do array na tabela para cada item dentro de livros
    livros.forEach((livro, index) => {
        const linha = document.createElement('tr')

        linha.innerHTML = `
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.ano}</td>
            <td>${livro.genero}</td>
            <td>${livro.disp ? 'Sim' : 'Não'}</td>
            <td><button onclick="emprestarLivro('${livro.titulo.replace(/'/g, "\\'")}')">Emprestar</button></td>
        `

        listaLivros.appendChild(linha)
    })
}


document.addEventListener('DOMContentLoaded', () => {
    renderizarTabela()
})
