const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

export default function Keyboard({
  word,
  guessedLetters,
  handleGuess,
  isWinner,
  isLoser,
}) {
  return (
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
  );
}