/* eslint-disable react/prop-types */
import { useState, useRef } from 'react'
import './GameScreen.css'

// eslint-disable-next-line no-unused-vars
const GameScreen = ({ verifyletter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {

  const [letter, setLetter] = useState("")
  const letterinputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyletter(letter)
    setLetter('')

    letterinputRef.current.focus()
  }

  return (
    <div className='game'>
      <p className="ponits">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>

      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
            <span key={i} className='letter'>
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )
        )}
      </div>

      <div className="letterContainer">
        <p>Tente adivinhar uam letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterinputRef} />
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>

    </div >

  )
}

export default GameScreen