export default function WordDisplay({ word, guessedLetters, isLoser }) {
  return (
    <div className="word">
      {word.split("").map((letter, index) => (
        <span key={index} className="letter-box">
          {guessedLetters.includes(letter) || isLoser ? letter : ""}
        </span>
      ))}
    </div>
  );
}