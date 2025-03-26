import { useEffect, useState } from "react";

const phrases = [
  
  `Success is not final, failure is not fatal: It is the courage to continue that counts. It's easy to become discouraged and lose momentum when things get tough, but perseverance is key. Every challenge is an opportunity to learn and grow. Take things one step at a time, and focus on the small wins. They build up, and before you know it, you will have accomplished far more than you thought possible.`,
  `The journey of a thousand miles begins with a single step. You may feel overwhelmed by the distance, but the most important thing is to begin. Even if you don't know exactly where to start, taking that first step will lead to another and then another. With each step forward, you will gain confidence and clarity. Keep moving forward, no matter how slow the progress seems.`,
  `You cannot change your destination overnight, but you can change your direction. Each day is a new chance to adjust your course, make better choices, and become more aligned with your goals. Don't worry about what you haven't accomplished yet. Focus on the small actions you can take today that will bring you closer to where you want to be tomorrow.`,
  `The only limit to our realization of tomorrow is our doubts of today. When we let fear, self-doubt, and uncertainty hold us back, we miss opportunities for growth. Believe in yourself and trust the process. It's okay to not have all the answers, but it's essential to move forward with courage and the belief that you will figure it out as you go along.`,
  `If you want to change your life, you must first change your habits. Your actions, repeated over time, create your destiny. Start by identifying the habits that aren't serving you and replace them with ones that will move you closer to your goals. It's not about perfection—it's about consistent improvement, no matter how small the steps are.`,
  `Mindset is everything. A growth mindset enables you to see challenges as opportunities and failure as part of the learning process. When you cultivate a positive and resilient mindset, you begin to approach life with a sense of curiosity and possibility. It's not about avoiding setbacks, but about learning from them and growing stronger.`,
  `Do not wait to strike until the iron is hot, but make it hot by striking. There is power in taking action, even when the circumstances aren't perfect. Procrastination is the enemy of progress. You don't need to have everything figured out before you start, but you must commit to moving forward with purpose. The heat of effort creates the momentum that will eventually carry you toward success.`,
  `Success doesn't come from what you do occasionally, it comes from what you do consistently. Small, consistent actions compound over time, leading to big results. It's the daily habits and rituals that will ultimately determine whether or not you achieve your goals. Focus on building a system that supports your success, and stick with it no matter how challenging it may seem.`,
  `Your life does not get better by chance, it gets better by change. It's easy to fall into the trap of waiting for the perfect moment, but the reality is that the right time never comes. You have to make the decision to change today. Take control of your circumstances, and make the necessary adjustments that will align your actions with your desired outcomes. Your future is built on the decisions you make now.`,
  `Great things never come from comfort zones. If you want to grow, you must be willing to step outside of what is familiar and take risks. True success comes from pushing through fear and doubt, and embracing the discomfort of change. It's only when you take that leap into the unknown that you can experience the full potential of what life has to offer. Don't wait for the perfect conditions—create them by stepping forward.`
 ];

const SHIFT_KEYS = ["ShiftLeft", "ShiftRight"];
const KEYBOARD_LAYOUT = {
  "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%",
  "6": "^", "7": "&", "8": "*", "9": "(", "0": ")", "-": "_", "=": "+",
  "[": "{", "]": "}", "\\": "|", ";": ":", "'": "\"", ",": "<", ".": ">", "/": "?"
};

export default function App() {
  const [phrase, setPhrase] = useState(getRandomPhrase());
  const [typed, setTyped] = useState("");
  const [currentKey, setCurrentKey] = useState(null);
  const [nextKeys, setNextKeys] = useState([]);
  const [shiftActive, setShiftActive] = useState(false);

  function getRandomPhrase() {
    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.repeat) return;
      if (e.key === "F5" || (e.ctrlKey && e.key === "r")) {
        e.preventDefault();
        return;
      }

      setCurrentKey(e.code);

      if (SHIFT_KEYS.includes(e.code)) {
        setShiftActive(true);
        return;
      }

      const expectedChar = phrase[typed.length];
      if (expectedChar === e.key) {
        setTyped((prev) => prev + e.key);
      }
    }

    function onKeyUp(e) {
      setCurrentKey(null);
      if (SHIFT_KEYS.includes(e.code)) setShiftActive(false);
    }

    function preventReload(e) {
      if ((e.key === "F5") || (e.ctrlKey && e.key === "r")) {
        e.preventDefault();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
    });
    window.addEventListener("keydown", preventReload);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", preventReload);
    };
  }, [typed, phrase]);

  useEffect(() => {
    const nextChar = phrase[typed.length];
    if (!nextChar) return;

    if (nextChar.match(/[A-Z]/) || Object.values(KEYBOARD_LAYOUT).includes(nextChar)) {
      setNextKeys(["ShiftLeft", "ShiftRight", getBaseKey(nextChar)]);
    } else if (nextChar === " ") {
      setNextKeys(["Space"]);
    } else {
      setNextKeys([nextChar]);
    }
  }, [typed, phrase]);

  useEffect(() => {
    if (typed === phrase) {
      setTimeout(() => {
        setTyped("");
        setPhrase(getRandomPhrase());
      }, 1000);
    }
  }, [typed]);

  function getBaseKey(char) {
    const entry = Object.entries(KEYBOARD_LAYOUT).find(([, shifted]) => shifted === char);
    return entry ? entry[0] : char.toLowerCase();
  }

  const renderKey = (keyLabel, code = keyLabel) => {
    const display = shiftActive
      ? KEYBOARD_LAYOUT[keyLabel] || keyLabel.toUpperCase()
      : keyLabel;
    return (
      <div
        key={code}
        className={`keyboard-key ${code === "Space" ? "spacebar-large" : ""} ${nextKeys.includes(code) ? "highlighted" : ""} ${currentKey === code ? "pressed" : ""}`}
      >
        {code === "Space" ? "" : display}
      </div>
    );
  };

  const row1 = "`1234567890-=".split("").map((k) => renderKey(k));
  const row2 = "qwertyuiop[]\\".split("").map((k) => renderKey(k));
  const row3 = "asdfghjkl;'".split("").map((k) => renderKey(k));
  const row4 = ["ShiftLeft", ..."zxcvbnm,./".split(""), "ShiftRight"].map((k) =>
    k === "ShiftLeft" || k === "ShiftRight" ? renderKey("Shift", k) : renderKey(k)
  );

  return (
    <div className="app-container">
      <h1 className="app-title">Typing Tutor</h1>
      <div className="phrase">
        <span className="typed-text">{typed}</span>
        <span className="pointer">{phrase[typed.length]}</span>
        <span className="remaining-text">{phrase.slice(typed.length + 1)}</span>
      </div>
      <div className="keyboard">
        <div className="keyboard-row">{row1}</div>
        <div className="keyboard-row">{row2}</div>
        <div className="keyboard-row">{row3}</div>
        <div className="keyboard-row">{row4}</div>
        <div className="keyboard-row">{renderKey("Space", "Space")}</div>
      </div>
    </div>
  );
}