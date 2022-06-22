/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

//referencias HTMl

let deck     = [];
const tipos  = ['C', 'D', 'H','S'];
const letras = ['J', 'K', 'Q', 'A']

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const puntosHTML = document.querySelectorAll('small');
const divCartasjugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');


let puntosJugador = 0,
      puntosComputadora = 0;
const crearDeck = () => {

    for (let i = 2; i <= 10 ; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for(let letra of letras){
        for(let tipo of tipos){
            deck.push(letra + tipo);
        }
    } 
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}
crearDeck();
 
const pedirCarta = () => {
    if (deck.length === 0){
        throw 'No hay cartas en el deck'
    }
    const carta = deck.pop();    
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1)
    return (isNaN(valor))  ?
           (valor === 'A') ? 11 : 10
           : valor * 1;
}
 valorCarta('3D')
//pedirCarta();


const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerHTML = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if ( puntosMinimos === 21 ){
            alert("Gansteeeeeeee")
            break;
        }else if (puntosMinimos > 21){
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosComputadora <= 21) )
    if(puntosComputadora > 21 ){
        alert("Gansteeeeeeee")
    } else if ((puntosComputadora > puntosMinimos) && (puntosComputadora <= 21)){
        alert("Perdisteeeee")
    } else if (puntosComputadora === puntosMinimos){
        alert("Empateeeeeee")
    }
  
}

//eventos
//<img  class="carta" src="assets/cartas/10C.png">
btnPedir.addEventListener('click', ()=> {
   const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHTML[0].innerHTML = puntosJugador;
  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${ carta }.png`;
  imgCarta.classList.add('carta');
  divCartasjugador.append(imgCarta);
  if ( puntosJugador > 21){
    alert("Perdisteeeee")
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    alert('21, Que bien')
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
  }
})

btnNuevo.addEventListener('click', ()=> {
    location.reload();
})
btnDetener.addEventListener('click', ()=> {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})

//turnoComputadora(15)