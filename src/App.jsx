/* eslint-disable no-unused-vars */



// CSS
import './App.css'
// React
import { useCallback, useEffect, useState } from 'react'

// Dados
import { wordsList } from './Dados/words'

// Componentes
import StartScreen from './Components/StartScreen'
import GameScreen from './Components/GameScreen'
import EndScreen from './Components/EndScreen'


const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' }
]

const guessesQty = 3

const App = () => {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState()
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pickWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]



    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  })

  // Starts The Secret Word Game
  const startGame = useCallback(() => {
    clearLettterStates()
    // pick word and pick category
    const { word, category } = pickWordAndCategory()

    // create array of letters
    let wordLetters = word.split('')
    wordLetters = wordLetters.map((l) => l.toLowerCase())



    // Fill States


    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)


    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  // Process the letter input
  const verifyletter = (letter) => {


    const normalizedLetter = letter.toLowerCase()

    // Check if letter has already been utilized
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    // Push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])

    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1)
    }


  }

  const clearLettterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  // Check if guesses ended
  useEffect(() => {
    if (guesses <= 0) {
      clearLettterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  // Check win condition

  useEffect(() => {
    const uniqueLetters = [... new Set(letters)]

    // win condition
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      // add score
      setScore((actualScore) => actualScore += 100);

      // Restart game with new word
      startGame()

    }

  }, [guessedLetters, letters, startGame, gameStage])

  // Restarts the game
  const retry = () => {
    setScore(0)
    setGameStage(stages[0].name)
    setGuesses(guessesQty)
  }



  return (
    <div className='App'>
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <GameScreen
        verifyletter={verifyletter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score} />}
      {gameStage === 'end' && <EndScreen retry={retry} score={score} />}
    </div>
  )
}

export default App