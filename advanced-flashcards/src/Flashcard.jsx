function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function highlightMatch(answer, guess) {
  if (!guess.trim()) return answer;

  const normalizedGuess = normalizeText(guess);
  if (!normalizedGuess) return answer;

  const escapedGuess = normalizedGuess.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regex = new RegExp(`(${escapedGuess})`, "i");

  const normalizedAnswer = normalizeText(answer);

  if (!regex.test(normalizedAnswer)) return answer;

  const lowerAnswer = answer.toLowerCase();
  const lowerGuess = guess.toLowerCase().trim();

  const directIndex = lowerAnswer.indexOf(lowerGuess);

  if (directIndex !== -1) {
    const before = answer.slice(0, directIndex);
    const match = answer.slice(directIndex, directIndex + guess.trim().length);
    const after = answer.slice(directIndex + guess.trim().length);

    return (
      <>
        {before}
        <mark className="answer-highlight">{match}</mark>
        {after}
      </>
    );
  }

  return answer;
}

function Flashcard({
  card,
  isFlipped,
  onFlip,
  difficultyStyles,
  feedback,
  submitted,
  guess,
}) {
  return (
    <button
      className={`flashcard ${isFlipped ? "flipped" : ""} ${!submitted ? "locked" : ""}`}
      onClick={onFlip}
    >
      <div className="flashcard-inner">
        <div className="flashcard-face flashcard-front">
          <span className={difficultyStyles[card.difficulty] || "difficulty"}>
            {card.difficulty}
          </span>

          <div className="card-content">
            <p className="card-label">Term</p>
            <h2>{card.question}</h2>

            <img className="card-image" src={card.image} alt={card.question} />

            {card.link && (
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
                onClick={(e) => e.stopPropagation()}
              >
                Watch my Drake Equation video
              </a>
            )}
          </div>

          <p className="card-hint">
            {submitted
              ? "Click the card to flip it"
              : "Submit a guess before flipping the card"}
          </p>
        </div>

        <div className="flashcard-face flashcard-back">
          <span className={difficultyStyles[card.difficulty] || "difficulty"}>
            {card.difficulty}
          </span>

          <div className="card-content">
            <p className="card-label">Definition</p>
            <h2>
              {feedback === "correct"
                ? highlightMatch(card.answer, guess)
                : card.answer}
            </h2>
          </div>

          <p className="card-hint">
            {submitted
              ? "Click the card to flip it"
              : "Submit a guess before flipping the card"}
          </p>
        </div>
      </div>
    </button>
  );
}

export default Flashcard;
