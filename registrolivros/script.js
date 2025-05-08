livros = JSON.parse(localStorage.getItem('livros')) || [];

//cria um objeto novo quando uma ação submit é feita no formulário, o livro novo é adicionado no array do catálogo completo
function registrarLivro(){
    const formreg = document.getElementById('formreg').value
    const formnome = document.getElementById('campo1-nome').value
    const formaut = document.getElementById('campo2-autor').value
    const formano = document.getElementById('campo1-ano').value
    const formgen = document.getElementById('campo2-genero').value

    if (!formnome || !formaut || !formano || !formgen){
        alert("Todos os campos precisam estar preenchidos.")
        return
    }

    let livros = JSON.parse(localStorage.getItem('livros')) || []

    const novoLivro = {
        titulo: formnome,
        autor: formaut,
        ano: formano,
        genero: formgen,
        disp: true
    }

    livros.push(novoLivro);
    localStorage.setItem('livros', JSON.stringify(livros))
    alert("Livro registrado com sucesso!")    
    document.getElementById('formreg').reset()
}