const connection = new WebSocket("wss://IdealisticCruelAutotote.saousername.repl.co");//internet jajajaja
const button = document.querySelector("#send");
const colors = ["blue","green","orange","purple"];//colores para nombres usuarios
const slashcommands = ['f', 'g']
//ZONA EMOTICONOS Y GIFS Y MEMES
//proximamente hare manual de emoticonos y material que se pueden enviar
const emojis = {":)":"🙂",":(":"😟",":D":"😄", ";(":"😭", "risa":"😂", "reir":"🙂", "contento":"😄","triste":"😟", 'JAJAJA':"<img src='https://i.redd.it/5qto9wwopnp31.jpg' width=100>","baile":"<img src='https://c.tenor.com/xlydCKGNv9kAAAAC/funny-meme.gif' width=100>","cum":"<img src='https://i.pinimg.com/originals/2a/55/bc/2a55bcef68f2531d42ab378919111880.jpg' width=75>","dawn":"<img src='https://i.pinimg.com/236x/9c/21/8d/9c218d4eb0c37b33155685ade1f6cb7e.jpg' width=175>","klk":"que lo queee","profe":"<img src='https://image.shutterstock.com/image-illustration/user-profile-caution-important-notice-260nw-1724695114.jpg'width=200>"};
//se usa profe para hacer de aviso
let yourcolor;
let playnoises = new Boolean(false);

connection.onopen = (event) => {
  console.log("Ximbi'space eta abierto.");
  var max = colors.length;
  var min = 0;
  yourcolor = colors[Math.floor(Math.random() * (max - min) + min)];
};
//Funcion para que suene el audio cada vez que se vaya,entre o manden un mensaje.
function notify() {
  if (playnoises == Boolean(true)) {
    document.getElementById('audio').play()
  }
}

window.onblur = function () {
    // para saber la hora del mensaje y mostrarlo junto a el.
    const currentDate = new Date
    let currentMinutes = currentDate.getMinutes().toString()
    let currentHours = currentDate.getHours().toString()
    
    if (currentMinutes.length < 2) {
      currentMinutes = '0' + currentDate.getMinutes()
    }
    if (currentHours.length < 2) {
      currentHours = '0' + currentDate.getHours()
    }
    const dateString = currentHours + ':' + currentMinutes
      
    const name = document.querySelector("#username")
    playnoises = Boolean(true);
    if (name.value != '') {
      const data = `<p><strong style='color: red'>${dateString} | ${name.value}</strong> se ha ido.</p>`;

      connection.send(data);
    }
}

window.onfocus = function () {
    // =======Zona de re-union del ususario
    const currentDate = new Date
    let currentMinutes = currentDate.getMinutes().toString()
    let currentHours = currentDate.getHours().toString()
    
    if (currentMinutes.length < 2) {
      currentMinutes = '0' + currentDate.getMinutes()
    }
    if (currentHours.length < 2) {
      currentHours = '0' + currentDate.getHours()
    }
    const dateString = currentHours + ':' + currentMinutes
      
    const name = document.querySelector("#username")
    //para que suene el aviso
    playnoises = Boolean(false);
    if (name.value != '') {
      const data = `<p><strong style='color: red'>${dateString} | ${name.value}</strong> se ha vuelto a unir.</p>`;

      connection.send(data);
    }
}
//========Servidor cerrado o fuera de servicio=============
connection.onclose = (event) => {
  console.log("Ximbi'space esta cerrado ahora.");
  const error = document.querySelector("#error");
  error.innerHTML = "<h2 style='color: red'>El servidor ha caido... volveremos pronto!</h2>"
};

connection.onerror = (event) => {
  console.error("Error observado en Ximbi'space:", event);
};

connection.onmessage = (event) => {
  // muestra el mensaje mandado en el chat.
  const chat = document.querySelector("#chat");
  chat.innerHTML += event.data;
  chat.scrollTop = chat.scrollHeight;
  if (event.data.startsWith("<p><strong style='color: red'>${dateString}")) {
  } else {
    notify();
  }
};
//======hora y aviso de union al grupo==================================
document.querySelector("#savename").addEventListener('click', () => {
  const currentDate = new Date
  let currentMinutes = currentDate.getMinutes().toString()
  let currentHours = currentDate.getHours().toString()

  if (currentMinutes.length < 2) {
    currentMinutes = '0' + currentDate.getMinutes()
  if (currentHours.length < 2) {
    currentHours = '0' + currentDate.getHours()
  }
  }
  const dateString = currentDate.getHours() + ':' + currentMinutes
  const name = document.querySelector("#username")
  const data = `<p><strong style='color: red'>${dateString} | ${name.value}</strong> Se ha unido a Ximbi'space.</p><p class="msj"><strong style='color: green'>${dateString} / ${name.value}:</strong> Hola peñaa! 🤪</p> <br\>`;
  
  connection.send(data);

})
//=================================================================
//============Enviar mensaje ===============================0
button.addEventListener("click", () => {
  const currentDate = new Date
  let currentMinutes = currentDate.getMinutes().toString()
  let currentHours = currentDate.getHours().toString()
  
  if (currentMinutes.length < 2) {
    currentMinutes = '0' + currentDate.getMinutes()
  }
  if (currentHours.length < 2) {
    currentHours = '0' + currentDate.getHours()
  }
  const dateString = currentHours + ':' + currentMinutes
   //ZONA IMPORTANTE TODO ESTO DE AQUI ABAJO 
  const name = document.querySelector("#username")
  const message = document.querySelector("#message");
  let newmessage = message.value;
//funcion para intercambiar texto por emojis,( ayuda de internet xd)
  for (const [key, value] of Object.entries(emojis)) {
    console.log(key, value);
    newmessage = newmessage.replace(key, value);
  }
//let data = `<p><strong style='color: ${yourcolor}'>${dateString} | ${name.value}:</strong> ${newmessage}</p>`;
 //se pone una classe para poder hacerle fondo al mensaje
  //hay que hacer esto para modo oscuro o literalmente no poner el color blanco en el modo oscuro y yasta.
  let data = `<p class="msj"><strong style='color: ${yourcolor}'>${dateString} / ${name.value}:</strong> ${newmessage}</p><br\>`;//sin el br no funciona bien
 //======================ZONA COMANDOS============================================ 
//PARA MANDAR UNA IMAGEN
  if (newmessage.startsWith("/img ")) {
    link = newmessage.split(' ')[1]
    data = `<p><strong style='color: ${yourcolor}'>${dateString} / ${name.value}:</strong> <br><img src=${link} width=500 style='border-radius: 5px;'></p>`;
    //MODO ITALICA
  } else if (newmessage.startsWith('/me ')) {
    newmessage = newmessage.slice(3)
    data = `<p><strong style='color: ${yourcolor}'>${dateString} / ${name.value}:</strong> <i>${newmessage}</i></p>`;
    //MODO ADD(/AD) REVISARRR!!!!! NO FUNCIONA
    
  } else if (newmessage.startsWith('/add ')) {
    newmessage = newmessage.slice(4)
    emoji.push(newmessage);
    data = `<p><strong style='color: ${yourcolor}'>${datestring} / SYSTEM:</strong> <i>Se ha guardado correctamente</i></p>`;  
    //==============
    //MODO ANONIMUS
  } else if (newmessage.startsWith('/anon ')) {
    newmessage = newmessage.slice(5)
    data = `<p><strong style='color: ${yourcolor}'>${dateString} / Anonymous:</strong> ${newmessage}</p>`;
    //MODO EJECUTAR CODIGO
  } else if (newmessage.startsWith('/exec ')) {
    newmessage = newmessage.slice(5)
    data = `<script>${newmessage}</script>`
  }
//MODO MANDAR MENSAJE DE ALERTA
  //hay que hacerle una revision porque no funciona
  if (newmessage.startsWith('/alerta ')) {
    newmessage = newmessage.slice(7)
    data = ``;//eso deberia estar vacio porque no es lo que queremos,no obstante se podria usar
    document.getElementById('alertBox').innerHTML = newmessage
    document.getElementById('alertBox').style.display = 'block';
    
    setTimeout(function(){ 
       document.getElementById('alertBox').style.display = 'none';
    }, 5000);

  }
//======================================================================================
//FINAL DE LA ZONA INTERESANTE
  //ZONA USADA PARA EL COMPOSE YA QUE SUSTITUYE LOS {} POR   NEGRITA.
  let newnnmessage = newmessage

  if (newmessage.includes('{')) {
    if (newmessage.includes('}')) {
      newnmessage = newmessage.replace('{', '<strong>')
      newnnmessage = newnmessage.replace('}', '</strong>')

      data = `<p><strong style='color: ${yourcolor}'>${dateString} | ${name.value}:</strong> ${newnnmessage}</p>`;
    }
  }


  if (newnnmessage != '') {
    connection.send(data);
  }

  
  message.value = "";
});

var myModal = document.getElementById('modal')
var myInput = document.getElementById('ignore')