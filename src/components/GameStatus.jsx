export default function GameStatus({ isWinner, isLoser, word }) {
  if (isWinner) {
    return <p className="message win">You won!</p>;
  }

  if (isLoser) {
    return <p className="message lose">You lost! The word was "{word}".</p>;
  }

  return null;
}