//se não houver nenhum outro livro salvo no localstorage, ele adiciona um array com todos os livros disponíveis por padrão
if (!localStorage.getItem('livros')) {
    //todos os livros atualmente disponíveis por padrão
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
    localStorage.setItem('livros', JSON.stringify(catlivros));
}
//Array de todos os livros
let livros = JSON.parse(localStorage.getItem('livros')) || [];

//função de empréstimo de livro
//quando o título é inserido, seja em upper ou lowercase, ele puxa o titulo
//do objeto e seta a disponibilidade como false
function emprestarLivro(titulo){
    const livro = livros.find(l => l.titulo.toLowerCase() === titulo.toLowerCase())
    if (!livro){
        alert ("Livro não encontrado.")
        return
    }
    if (!livro.disp) {
        alert("Livro não está disponível.")
        return
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
    
    livros = JSON.parse(localStorage.getItem('livros')) || [];

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

//função simples que reseta o localstorage para ao padrão para finalidades de teste
function resetarBiblioteca() {
    localStorage.removeItem('livros');
    location.reload();
}

//função de pesquisa de livros
function pesquisarLivro(){
    const termoPesquisa = document.getElementById('pesquisa').value.toLowerCase()
    const listaLivros = document.getElementById('listaLivros')
    listaLivros.innerHTML = ''

    //filtra os livros de acordo com o termo pesquisado
    const livrosFiltrados = livros.filter(livro => 
        livro.titulo.toLowerCase().includes(termoPesquisa) || 
        livro.autor.toLowerCase().includes(termoPesquisa) ||
        livro.genero.toLowerCase().includes(termoPesquisa)
    );
    
    // renderiza os livros que contém o filtro relevante
    //cria uma tabela para cada livro disponível que for pego pelo filtro de pesquisa
    livrosFiltrados.forEach((livro) => {
        const linha = document.createElement('tr')

        linha.innerHTML = `
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.ano}</td>
            <td>${livro.genero}</td>
            <td>${livro.disp ? 'Sim' : 'Não'}</td>
            <td><button onclick="emprestarLivro('${livro.titulo.replace(/'/g, "\\'")}')">Emprestar</button></td>
        `

        listaLivros.appendChild(linha);
    })
    
}

//menu dropdown da página HTML
function menuDropdown(){
    const generos = document.getElementById('generos')
    generos.innerHTML = '<option selected disabled>Gêneros</option>'

     // gera um array de gêneros únicos
     const generosUnicos = [...new Set(livros.map(livro => livro.genero))]

     generosUnicos.forEach(genero => {
        const option = document.createElement('option');
        option.value = genero;
        option.textContent = genero;
        generos.appendChild(option);
    });

}

//função que renderiza somente o gênero selecionado pelo botão dropdown na tabela
function filtrarPorGenero() {
    const generoSelecionado = document.getElementById('generos').value.toLowerCase();
    const listaLivros = document.getElementById('listaLivros');
    listaLivros.innerHTML = '';

    const livrosFiltrados = livros.filter(livro => livro.genero.toLowerCase() === generoSelecionado);

    livrosFiltrados.forEach((livro) => {
        const linha = document.createElement('tr');
        //cria uma tabela para cada livro relevante pego pelo filtro do menu dropdown
        linha.innerHTML = `
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.ano}</td>
            <td>${livro.genero}</td>
            <td>${livro.disp ? 'Sim' : 'Não'}</td>
            <td><button onclick="emprestarLivro('${livro.titulo.replace(/'/g, "\\'")}')">Emprestar</button></td>
        `;

        listaLivros.appendChild(linha);
    });
}


//renderiza a tabela quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    renderizarTabela()
    menuDropdown()
})

//executa a função de pesquisa quando algo é digitado na barra de pesquisa
document.getElementById('pesquisa').addEventListener('input', pesquisarLivro)
//executa a função de filtragem quando um gênero é selecionado no menu dropdown
document.getElementById('generos').addEventListener('change', filtrarPorGenero);
