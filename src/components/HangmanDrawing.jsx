const hangmanParts = [
  "O",   // head
  "|",   // body
  "/",   // left arm
  "\\",  // right arm
  "/",   // left leg
  "\\"   // right leg
];

export default function HangmanDrawing({ wrongGuesses }) {
  return (
    <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
      <p>Hangman:</p>

      {/* Show only parts based on wrong guesses */}
      {hangmanParts.slice(0, wrongGuesses).map((part, index) => (
        <span key={index} style={{ marginRight: "5px" }}>
          {part}
        </span>
      ))}
    </div>
  );
}