import './EndScreen.css'

const EndScreen = ({ retry, score }) => {
  return (
    <div>
      <h1>Fim de Jogo</h1>
      <h2>A sua pontuação foi : {score}</h2>
      <button onClick={retry}>Reiniciar</button>
    </div>
  )
}
export default EndScreen