
# Typing Tutor Demo

This project is a React + Vite typing tutor application that helps users improve typing accuracy and speed by practicing short phrases.

# Typing Tutor - Vite React App
# functionalitesTT
- When the user presses a key, the corresponding key on the virtual keyboard is visually "pressed".
- When a user lifts up the key, the highlight is removed.
- Both Left and Right `Shift` keys are shown and highlighted if the next character requires it.
- The keyboard visually displays all keys in uppercase to match a real keyboard.
- The space bar is displayed wider to mimic real keyboard layout.
- The next key to be typed is highlighted with a red shadow.
- When a phrase is fully typed correctly, the next phrase loads after a delay.
- Browser reload (F5 or Ctrl+R) is disabled to prevent accidental resets.
- No `<input>` element is used.
- Follows unidirectional dataflow using React `useState` and `useEffect`.


## Tech Stack

- React
- Vite
- CSS

## To Run the App

```bash
npm install
npm run dev

# Other Notes

1.  **Phrase Display:**
    * The application displays a phrase for the user to type.
    * The displayed phrase is randomly selected from a list of predefined phrases.
2.  **Typing Input:**
    * The user types the phrase using their keyboard.
    * The application visually indicates