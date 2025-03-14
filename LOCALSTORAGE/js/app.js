// Variables
const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
const eliminarTodoBtn = document.createElement('button');
let tweets = [];

// Agregar botón "Eliminar Todo"
eliminarTodoBtn.textContent = "Eliminar Todo";
eliminarTodoBtn.classList = "button-danger u-full-width";
eliminarTodoBtn.style.marginTop = "15px";
document.querySelector('.message-list').appendChild(eliminarTodoBtn);

// Event Listeners
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
    listaTweets.addEventListener('click', gestionarTweet);
    eliminarTodoBtn.addEventListener('click', eliminarTodosLosTweets);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });
}

// Agregar un nuevo mensaje
function agregarTweet(e) {
    e.preventDefault();
    const tweetTexto = document.querySelector('#tweet').value.trim();

    if (tweetTexto === '') {
        mostrarError('Un mensaje no puede ir vacío');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        texto: tweetTexto
    };

    tweets.push(tweetObj);
    crearHTML();
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    document.querySelector('#contenido').appendChild(mensajeError);

    setTimeout(() => mensajeError.remove(), 3000);
}

// Generar la lista de mensajes en el HTML
function crearHTML() {
    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${tweet.texto}</span>
                <div class="tweet-actions">
                    <button class="editar-tweet" data-id="${tweet.id}">✏️</button>
                    <button class="borrar-tweet" data-id="${tweet.id}">❌</button>
                </div>
            `;
            li.dataset.tweetId = tweet.id;
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Manejar eventos de eliminar o editar
function gestionarTweet(e) {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('borrar-tweet')) {
        eliminarTweet(id);
    } else if (e.target.classList.contains('editar-tweet')) {
        editarTweet(id);
    }
}

// Editar un mensaje
function editarTweet(id) {
    const tweetEditar = tweets.find(tweet => tweet.id == id);
    if (tweetEditar) {
        document.querySelector('#tweet').value = tweetEditar.texto;
        tweets = tweets.filter(tweet => tweet.id != id);
        crearHTML();
    }
}

// Eliminar un solo mensaje
function eliminarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id != id);
    crearHTML();
}

// Eliminar todos los mensajes
function eliminarTodosLosTweets() {
    tweets = [];
    crearHTML();
}

// Guardar en LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Limpiar HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
