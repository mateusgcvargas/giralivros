//Array de todos os livros
const livros = JSON.parse(localStorage.getItem('livros')) || []

const catlivros = [
    {titulo: "Fahrenheit 451", autor:"Ray Bradbury", ano:"1953", genero:"Mistério", disp:true },
    {titulo: "Não Pisque", autor:"Stephen King", ano:"2025", genero:"Mistério", disp:true },
    {titulo: "Não Tenho Boca e Preciso Gritar", autor:"Harlan Ellison", ano:"", genero:"Ficção Científica", disp:true },
    {titulo: "Duna", autor:"Frank Herbert", ano:"1965", genero:"Ficção Científica", disp:true },
    {titulo: "O Hobbit", autor:"J.R.R Tolkien", ano:"1937", genero:"Fantasia", disp:true },
    {titulo: "O Senhor dos Anéis", autor:"J.R.R. Tolkien", ano:"1954", genero:"Fantasia", disp:true },
    {titulo: "O Grande Gatsby", autor:"F. Scott Fitzgerald", ano:"1925", genero:"Romance", disp:true },
    {titulo: "Romeu e Julieta", autor:"William Shakespeare", ano:"1597", genero:"Romance", disp:true },
    {titulo: "O Sol É Pra Todos", autor:"Harper Lee", ano:"1960", genero:"Drama", disp:true },
    {titulo: "Hamlet", autor:"William Shakespeare   ", ano:"1623", genero:"Drama", disp:true },
]

livros.push(...catlivros)
localStorage.setItem('livros', JSON.stringify(livros));

function emprestarLivro(titulo){
    const livros = JSON.parse(localStorage.getItem('livros')) || []
    const livro = livros.find(l => l.titulo.toLowerCase() === titulo.toLowerCase());
    
    if (!livro.disp) {
        alert("Livro não está disponível.")
    }

    livro.disp = false
    console.log(`Você emprestou o livro: ${livro.titulo}`);
}

