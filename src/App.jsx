import { useEffect, useState } from "react";
import "./index.css";
import HangmanDrawing from "./components/HangmanDrawing";

const wordGroups = {
  Tech: ["react", "javascript", "browser", "frontend", "developer", "coding"],
  Animals: ["tiger", "zebra", "rabbit", "dolphin", "elephant", "giraffe"],
  Movies: ["avatar", "frozen", "gladiator", "inception", "aladdin", "rocky"],
};

function getRandomWord(category) {
  const words = wordGroups[category];
  return words[Math.floor(Math.random() * words.length)];
}

export default function App() {
  const [category, setCategory] = useState("Tech");
  const [word, setWord] = useState(() => getRandomWord("Tech"));
  const [guessedLetters, setGuessedLetters] = useState([]);

  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem("hangmanScore");
    return savedScore ? JSON.parse(savedScore) : { wins: 0, losses: 0 };
  });

  const maxWrongGuesses = 6;

  const wrongLetters = guessedLetters.filter((letter) => !word.includes(letter));
  const wrongGuesses = wrongLetters.length;

  const isWinner = word.split("").every((letter) => guessedLetters.includes(letter));
  const isLoser = wrongGuesses >= maxWrongGuesses;

  function handleGuess(letter) {
    if (guessedLetters.includes(letter) || isWinner || isLoser) return;
    setGuessedLetters((prev) => [...prev, letter]);
  }

  function restartGame(nextCategory = category) {
    setWord(getRandomWord(nextCategory));
    setGuessedLetters([]);
  }

  function handleCategoryChange(e) {
    const newCategory = e.target.value;
    setCategory(newCategory);
    restartGame(newCategory);
  }

  function resetScore() {
    const cleared = { wins: 0, losses: 0 };
    setScore(cleared);
    localStorage.setItem("hangmanScore", JSON.stringify(cleared));
  }

  useEffect(() => {
    function handleKeyDown(e) {
      const letter = e.key.toLowerCase();

      if (/^[a-z]$/.test(letter)) {
        handleGuess(letter);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guessedLetters, isWinner, isLoser, word]);

  useEffect(() => {
    localStorage.setItem("hangmanScore", JSON.stringify(score));
  }, [score]);

  useEffect(() => {
    if (isWinner) {
      setScore((prev) => ({
        ...prev,
        wins: prev.wins + 1,
      }));
    }
  }, [isWinner]);

  useEffect(() => {
    if (isLoser) {
      setScore((prev) => ({
        ...prev,
        losses: prev.losses + 1,
      }));
    }
  }, [isLoser]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="app">
      <h1>Hangman Game</h1>
      <p className="subtitle">Use your keyboard or tap the letters on screen.</p>

      <div className="top-bar">
        <div className="scoreboard">
          <p>Wins: {score.wins}</p>
          <p>Losses: {score.losses}</p>
        </div>

        <div className="category-picker">
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={handleCategoryChange}>
            {Object.keys(wordGroups).map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="game-info">
        Wrong guesses: {wrongGuesses} / {maxWrongGuesses}
      </p>

      <HangmanDrawing wrongGuesses={wrongGuesses} />

      <div className="word">
        {word.split("").map((letter, index) => (
          <span key={index} className="letter-box">
            {guessedLetters.includes(letter) || isLoser ? letter : ""}
          </span>
        ))}
      </div>

      <div className="keyboard">
        {alphabet.map((letter) => {
          const isGuessed = guessedLetters.includes(letter);
          const isCorrect = isGuessed && word.includes(letter);
          const isWrong = isGuessed && !word.includes(letter);

          return (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={isGuessed || isWinner || isLoser}
              className={isCorrect ? "correct" : isWrong ? "wrong" : ""}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {isWinner && <p className="message win">You won!</p>}
      {isLoser && (
        <p className="message lose">You lost! The word was "{word}".</p>
      )}

      <div className="button-row">
        <button className="restart-btn" onClick={() => restartGame()}>
          Restart Game
        </button>

        <button className="reset-score-btn" onClick={resetScore}>
          Reset Score
        </button>
      </div>
    </div>
  );
}