import { useMemo, useState, useRef, useEffect } from "react";
import "./App.css";
import Flashcard from "./Flashcard";

const baseCards = [
  {
    question: "Red giant",
    image: "/redGiant.jpg",
    answer:
      "Star in end of life cycle. Has completed core hydrogen fusion and left the main sequence. Hydrogen shell burning has begun as well as core helium fusion. Hydrostatic equilibrium has been lost, and outer layers have begun expanding.",
  },
  {
    question: "Helium flash",
    image: "/heliumFlash.jpg",
    answer:
      "A nearly explosive ignition of helium in the triple-alpha process in the dense core of a red giant star (post-main sequence).",
  },
  {
    question: "Horizontal branch",
    image: "/horizontalBranch.jpg",
    answer:
      "The point where a main sequence star has left the main sequence (per the H-R diagram) and starts moving horizontally instead of vertically due to helium flash and hydrogen shell burning.",
  },
  {
    question: "Asymptotic Giant Branch (AGB)",
    image: "/AGB.png",
    answer:
      "Portion on the H-R diagram where cool, evolved stars lie. Consists of low to intermediate mass stars (0.5-8 MSun) late in their lives, with an inert carbon-oxygen core, helium shell burning, and a hydrogen burning shell.",
  },
  {
    question: "Planetary nebula",
    image: "/planetaryNebula.jpg",
    answer:
      "A shell of gas ejected by and expanding away from an extremely hot low-mass star nearing the end of its life.",
  },
  {
    question: "Electron degeneracy pressure",
    image: "/edp.jpg",
    answer:
      "Pressure created when matter becomes so dense that electrons resist further crowding because they cannot occupy the same quantum state.",
  },
  {
    question: "Chandrasekhar limit",
    image: "/chandrasekharLimit.webp",
    answer:
      "The upper limit to the mass of a white dwarf (about 1.4 MSun). Beyond this, collapse leads toward a supernova and compact remnant.",
  },
  {
    question: "Core-collapse supernova (Type II)",
    image: "/typeIISupernova.webp",
    answer:
      "When a massive star (about 8-50 MSun) runs out of core fuel, the core collapses and a powerful shockwave explodes the outer layers, leaving a neutron star or black hole.",
  },
  {
    question: "Type Ia supernova",
    image: "/typeIaSN.jpg",
    answer:
      "A supernova formed by the explosion of a white dwarf in a binary system; used as a distance indicator on large scales.",
  },
  {
    question: "Neutron star",
    image: "/neutronStar.jpg",
    answer:
      "A compact object of extremely high density composed almost entirely of neutrons.",
  },
  {
    question: "Pulsar",
    image: "/pulsar.jpg",
    answer:
      "A rapidly rotating magnetic neutron star that emits very regular pulses of radiation.",
  },
  {
    question: "Supernova remnant",
    image: "/SNRemnant.jpg",
    answer:
      "The expanding structure after a supernova, including ejected material, a shockwave, and swept-up interstellar gas.",
  },
  {
    question: "Spacetime curvature",
    image: "/spacetimeCurvature.webp",
    answer:
      "Einstein's general relativity idea that mass and energy warp spacetime, and that warping is experienced as gravity.",
  },
  {
    question: "Schwarzschild radius",
    image: "/schwarzschildRadius.jpg",
    answer: "The radius of an event horizon for a non-rotating black hole.",
  },
  {
    question: "Event horizon",
    image: "/eventHorizon.jpg",
    answer:
      "The boundary around a black hole where escape velocity exceeds the speed of light, so nothing can escape.",
  },
  {
    question: "Singularity",
    image: "/singularity.jpg",
    answer:
      "The point of zero volume and effectively infinite density to which matter collapses in a black hole model.",
  },
  {
    question: "Gravitational redshift",
    image: "/gravRedShift.jpg",
    answer:
      "Increase in wavelength of light when it propagates away from a strong gravitational field.",
  },
  {
    question: "Gravitational lensing",
    image: "/gravitationallensing.jpg",
    answer:
      "Bending of light by massive objects, which can magnify, distort, or create multiple images of distant sources.",
  },
  {
    question: "Time dilation",
    image: "/timeDilation.avif",
    answer:
      "Time passes more slowly for an observer in relative motion or in a stronger gravitational field.",
  },
  {
    question: "Accretion disk",
    image: "/accretionDisk.jpg",
    answer:
      "A disk of gas and dust orbiting newborn stars or compact objects such as white dwarfs, neutron stars, and black holes.",
  },
  {
    question: "Sagittarius A*",
    image: "/sagA.jpg",
    answer:
      "The supermassive black hole in the center of the Milky Way, in the direction of Sagittarius.",
  },
  {
    question: "Disk",
    answer:
      "The flattened, rotating component of a spiral or lenticular galaxy containing most stars, gas, and dust.",
  },
  {
    question: "Bulge",
    answer:
      "The central rounded region of the Milky Way or a similar galaxy (also called the nuclear bulge).",
  },
  {
    question: "Halo",
    answer:
      "The outer extent of a galaxy containing a sparse, roughly spherical distribution of stars and globular clusters.",
  },
  {
    question: "Spiral arms",
    answer:
      "Spiral-shaped regions in galaxy disks with relatively dense interstellar material and many young stars.",
  },
  {
    question: "Barred spiral",
    image: "/barredSpiral.jpg",
    answer:
      "A spiral galaxy with a central bar-shaped structure from which spiral arms emerge.",
  },
  {
    question: "Population I / Population II stars",
    image: "/pop1And2Stars.webp",
    answer:
      "Population I stars are metal-rich and typically younger in the disk; Population II stars are older and metal-poor.",
  },
  {
    question: "Rotation curve",
    answer:
      "A plot of orbital speed in a galaxy versus distance from the center, often measured with Doppler shifts.",
  },
  {
    question: "Dark matter halo",
    answer:
      "Mass surrounding a galaxy and extending beyond luminous stars, inferred from gravity though its composition remains unknown.",
  },
  {
    question: "Spiral galaxy",
    image: "/spiralGalaxy.jpg",
    answer:
      "A flattened, rotating galaxy with pinwheel-like arms of interstellar material and young stars.",
  },
  {
    question: "Elliptical galaxy",
    image: "/ellipticalGalaxyNGC2865.jpeg",
    answer:
      "A galaxy with an elliptical shape and no conspicuous interstellar material.",
  },
  {
    question: "Irregular galaxy",
    image: "/irregularGalaxy-NGC1427A.jpg",
    answer:
      "A galaxy without clear symmetry or pattern, neither spiral nor elliptical.",
  },
  {
    question: "Starburst galaxy",
    image: "/antennaeGalaxiesStarburst.jpg",
    answer:
      "A galaxy or galaxy merger converting gas into stars much faster than usual.",
  },
  {
    question: "Hubble tuning fork",
    image: "/HTF.jpg",
    answer:
      "Hubble's visual classification diagram with ellipticals on the handle and normal/barred spirals on the prongs.",
  },
  {
    question: "Tidal tails",
    image: "/tidalTails.jpg",
    answer:
      "Long streams of stars and gas pulled from galaxies during close encounters or mergers by tidal forces.",
  },
  {
    question: "Cepheid variable (distance indicator)",
    answer:
      "A standard candle used to measure distance because pulsation period reveals intrinsic brightness.",
  },
  {
    question: "Tully-Fisher relation",
    answer:
      "An empirical law linking a spiral galaxy's luminosity to its rotational velocity.",
  },
  {
    question: "Type Ia supernova (distance indicator)",
    answer:
      "Type Ia supernovae act as standard candles for measuring extragalactic distances.",
  },
  {
    question: "Active Galactic Nucleus (AGN)",
    image: "/AGN.jpg",
    answer:
      "A compact energetic region at a galaxy center whose luminosity is not produced by normal stellar populations.",
  },
  {
    question: "Quasar",
    image: "/quasar.webp",
    answer:
      "An extremely luminous AGN powered by a supermassive black hole accreting matter.",
  },
  {
    question: "Radio galaxy",
    answer:
      "A galaxy emitting powerful radio waves from jets launched by a central supermassive black hole.",
  },
  {
    question: "Blazar",
    image: "/blazar.jpg",
    answer:
      "An AGN viewed nearly down its jet axis, appearing extremely bright and variable.",
  },
  {
    question: "Hubble's Law",
    image: "/hubblesLaw.gif",
    answer:
      "The radial velocities of distant galaxies are proportional to their distances from us.",
  },
  {
    question: "Expansion of the universe",
    image: "/expansion.jpg",
    answer:
      "The observation that space itself is stretching, so distant galaxies recede from one another over time.",
  },
  {
    question: "Cosmic Microwave Background (CMB)",
    image: "/CMB.jpeg",
    answer:
      "Relic radiation from the early universe, observed today as a nearly uniform microwave glow.",
  },
  {
    question: "Big Bang nucleosynthesis",
    answer:
      "Formation of the light elements in the early universe through nuclear reactions.",
  },
  {
    question: "Dark matter",
    answer:
      "Non-luminous matter inferred from gravitational effects on galaxies, clusters, and large-scale structure.",
  },
  {
    question: "Dark energy",
    answer:
      "A component of the universe associated with accelerated cosmic expansion.",
  },
  {
    question: "Accelerated expansion",
    answer:
      "The expansion of the universe is speeding up rather than slowing down.",
  },
  {
    question: "Habitable zone",
    image: "/habitable.jpg",
    answer:
      "Region around a star where planetary surface conditions may allow liquid water.",
  },
  {
    question: "Extremophile",
    answer:
      "An organism, usually microbial, that thrives in harsh environments once thought uninhabitable.",
  },
  {
    question: "Astrobiology",
    answer: "The interdisciplinary scientific study of life in the universe.",
  },
  {
    question: "Biosignature",
    answer:
      "Any substance, structure, or phenomenon that may indicate past or present life.",
  },
  {
    question: "Transit spectroscopy",
    answer:
      "Studying exoplanet atmospheres by analyzing starlight filtered through them during transit.",
  },
  {
    question: "Drake Equation",
    image: "/robbysDrakeCalculation.png",
    link: "https://youtu.be/FB4jxhzwHrk?si=R7TG-JWNrectWsRt",
    answer:
      "N = fp * ne * fl * fi * fc * L; a probabilistic estimate of detectable intelligent civilizations in our galaxy.",
  },
  {
    question: "SETI",
    image: "/seti.jpg",
    answer: "The Search for Extraterrestrial Intelligence.",
  },
  {
    question: "Liquid water criterion",
    answer:
      "Conditions allowing liquid water, often used as a basic requirement for potential life.",
  },
  {
    question: "Atmospheric disequilibrium",
    answer:
      "A chemically unstable atmospheric gas mix that persists due to ongoing processes, potentially including biology.",
  },
].map((card) => ({
  ...card,
  image: card.image ?? "/NASALogo.png",
}));

function getDifficultyByIndex(index) {
  if (index < 16) return "Easy";
  if (index < 34) return "Medium";
  return "Hard";
}

const cards = baseCards.map((card, index) => ({
  ...card,
  difficulty: getDifficultyByIndex(index),
}));

const difficultyStyles = {
  Easy: "difficulty easy",
  Medium: "difficulty medium",
  Hard: "difficulty hard",
};

function createShuffledCards(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s*]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isGuessCorrect(guess, answer) {
  const normalizedGuess = normalizeText(guess);
  const normalizedAnswer = normalizeText(answer);

  if (!normalizedGuess) return false;

  return (
    normalizedAnswer.includes(normalizedGuess) ||
    normalizedGuess.includes(normalizedAnswer)
  );
}

export default function App() {
  useEffect(() => {
    guessInputRef.current?.focus();
  }, []);

  const [deck, setDeck] = useState(cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const currentCard = deck[currentIndex];
  const isFirstCard = currentIndex === 0;
  const isLastCard = currentIndex === deck.length - 1;
  const guessInputRef = useRef(null);

  const feedbackClass = useMemo(() => {
    if (feedback === "correct") return "feedback correct";
    if (feedback === "incorrect") return "feedback incorrect";
    return "feedback";
  }, [feedback]);

  // In addition to handling card reset functionality, this function focuses the guess input field so users can start
  // typing immediately without needing to click on it first.
  const resetCardState = () => {
    setIsFlipped(false);
    setGuess("");
    setFeedback("");
    setSubmitted(false);

    setTimeout(() => {
      guessInputRef.current?.focus();
    }, 0);
  };

  const handleResetDeck = () => {
    const confirmReset = window.confirm(
      "Reset the entire deck and streak counters?",
    );

    if (!confirmReset) return;

    setDeck(cards);
    setCurrentIndex(0);
    setCurrentStreak(0);
    setLongestStreak(0);
    resetCardState();

    setTimeout(() => {
      guessInputRef.current?.focus();
    }, 0);
  };

  const handleFlip = () => {
    if (!submitted) {
      alert(
        "Enter your guess in the input box and click 'Submit Guess' before flipping the card.",
      );
      return;
    }

    setIsFlipped((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const correct = isGuessCorrect(guess, currentCard.answer);

    setSubmitted(true);

    if (correct) {
      setFeedback("correct");
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setLongestStreak((prev) => Math.max(prev, newStreak));
    } else {
      setFeedback("incorrect");
      setCurrentStreak(0);
    }
  };

  const handleNextCard = () => {
    if (isLastCard) return;
    setCurrentIndex((prev) => prev + 1);
    resetCardState();
  };

  const handlePreviousCard = () => {
    if (isFirstCard) return;
    setCurrentIndex((prev) => prev - 1);
    resetCardState();
  };

  const handleShuffle = () => {
    const shuffled = createShuffledCards(cards);
    setDeck(shuffled);
    setCurrentIndex(0);
    resetCardState();
  };

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">ASTRONOMY EXAM 4 FLASHCARDS</p>
        <h1>Cosmic Concepts Study Deck</h1>
        <p className="description">
          Study major astronomy terms from stellar evolution, black holes,
          galaxies, cosmology, and astrobiology. Type your guess before flipping
          the card, check your answer, and move through the deck in order.
        </p>

        <div className="stats">
          <div className="stat-box">
            <span className="stat-number">{deck.length}</span>
            <span className="stat-label">Total Cards</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">3</span>
            <span className="stat-label">Difficulty Levels</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{currentStreak}</span>
            <span className="stat-label">Current Streak</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{longestStreak}</span>
            <span className="stat-label">Longest Streak</span>
          </div>
        </div>
      </section>

      <section className="study-area">
        <p className="progress">
          Card {currentIndex + 1} / {deck.length}
          <span className="remaining">
            {" "}
            • {deck.length - currentIndex - 1} remaining
          </span>
        </p>

        <Flashcard
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          difficultyStyles={difficultyStyles}
          feedback={feedback}
          submitted={submitted}
          guess={guess}
        />

        <form className="guess-form" onSubmit={handleSubmit}>
          <label htmlFor="guess" className="guess-label">
            Enter your guess before flipping the card:
          </label>

          <div className="guess-controls">
            <input
              ref={guessInputRef}
              id="guess"
              className={`guess-input ${
                feedback === "correct"
                  ? "guess-input-correct"
                  : feedback === "incorrect"
                    ? "guess-input-incorrect"
                    : ""
              }`}
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
              placeholder="Type your answer here..."
            />
            <button className="action-btn submit-btn" type="submit">
              Submit Guess
            </button>
          </div>

          {submitted && (
            <p className={feedbackClass}>
              {feedback === "correct"
                ? "Correct! Nice job."
                : "Not quite — flip the card and compare your answer."}
            </p>
          )}
        </form>

        <div className="controls controls-row">
          <button
            className="action-btn nav-btn"
            onClick={handlePreviousCard}
            disabled={isFirstCard}
          >
            ← Previous
          </button>

          <button className="action-btn shuffle-btn" onClick={handleShuffle}>
            Shuffle Deck
          </button>

          <button className="action-btn reset-btn" onClick={handleResetDeck}>
            Reset Deck
          </button>

          <button
            className="action-btn nav-btn"
            onClick={handleNextCard}
            disabled={isLastCard}
          >
            Next →
          </button>
        </div>
      </section>
    </main>
  );
}
