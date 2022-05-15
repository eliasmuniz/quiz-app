import preguntas from "./preguntas";
import {useState, useEffect} from "react";


function App() {
  const [ preguntaActual, setPreguntaActual] = useState(0);// Pregunta en la que estamos
  const [ puntuacion, setPuntuacion ] = useState(0); // Revisa la puntuación
  const [ haFinalizado, setHaFinalizado ] = useState(false); // Estado para revisar si ha finalizado el test
  const [ tiempoRestante, setTiempoRestante] = useState(10);
  const [ respuestasDehabilitadas, setRespuestasDehabilitadas] = useState(false);
  const [ respuestasVisibles, setRespuestasVisibles] = useState(false);
  
  function handleAnswerSubmit(isCorrect, e) {
    // Añadir puntuación
    if (isCorrect) setPuntuacion(puntuacion+1);

    // Añadir estulos de pregunta
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    
    // Cambiar a la siguiente pregunta
    setTimeout(() =>{
      if(preguntaActual === preguntas.length-1){
        setHaFinalizado(true);
      }else{
        setPreguntaActual(preguntaActual+1);
        setTiempoRestante(10);
      }
    },1000)
   
  }

  useEffect(()=>{
    const intervalo = setInterval(() => {
      if(tiempoRestante >0) setTiempoRestante((prev) => prev-1)
      if(tiempoRestante===0)setRespuestasDehabilitadas(true)
    },1000);
    
    return () => clearInterval(intervalo)
  },[tiempoRestante]);



  if(haFinalizado) return(
    <main className="app">
      <div className="juego-terminado">
        <span>
          {" "}
          Obtuviste {puntuacion} de {preguntas.length}{" "}
        </span> 
        <button onClick={()=>window.location.href="/"}>
          Volver a jugar
        </button>
        <button
            onClick={() => {
              setHaFinalizado(false);
              setRespuestasVisibles(true);
              setPreguntaActual(0);
            }}
          >
            Ver respuestas
          </button>
      </div>
    </main>
  );

  if (respuestasVisibles) return (
    <main className="app">
      <div className="lado-izquierdo">
        <div className="numero-pregunta">
          <span> Pregunta {preguntaActual + 1} de</span> {preguntas.length}
        </div>
        <div className="titulo-pregunta">
          {preguntas[preguntaActual].titulo}
        </div>
        <div>
          {
            preguntas[preguntaActual].opciones.filter(
              (opcion) => opcion.isCorrect
            )[0].textoRespuesta
          }
        </div>
        <button
          onClick={() => {
            if (preguntaActual === preguntas.length - 1) {
              window.location.href = "/";
            } else {
              setPreguntaActual(preguntaActual + 1);
            }
          }}
        >
          {preguntaActual === preguntas.length - 1
            ? "Volver a jugar"
            : "Siguiente"}
        </button>
      </div>
    </main>
  );


  return (
    <main className="app">
      <div className="lado-izquierdo">
        <div className="numero-pregunta">
          <span>Pregunta {preguntaActual + 1} de </span> {preguntas.length}
        </div>
        <div className="titulo-pregunta">
          {preguntas[preguntaActual].titulo}
        </div>
        <div>
          {!respuestasDehabilitadas ? (
            <span className="tiempo-restante">
              Tiempo restante: {tiempoRestante}
            </span>
          ): (
            <button
              onClick={()=>{
                setTiempoRestante(10)
                setRespuestasDehabilitadas(false);
                if (preguntaActual === preguntas.length - 1) {
                  setIsFinished(true);
                } else {
                  setPreguntaActual(preguntaActual + 1);
                }
              }}
            >
              Continuar
            </button>
          )}
         
        </div>
      </div>
      <div className="lado-derecho">
        { preguntas[preguntaActual].opciones.map((respuesta) => (
          <button 
            key={respuesta.textoRespuesta} 
            disabled={respuestasDehabilitadas}
            onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
            >
            {respuesta.textoRespuesta}
            </button>
        ))}
    
      </div>
    </main>
  )
}

export default App
