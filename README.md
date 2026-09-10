# Cryptography & Information Security Lab 🛡️

A modern, multi-screen, professional **Cryptography & Information Security Learning Platform**. Built as a single-page application (SPA), it features dedicated interactive workspaces for classical ciphers, step-by-step visualizers, an 8-chapter Learning Hub with **Student Memory Hacks & Exam Cheat Codes**, self-assessment quizzes, dual Light/Dark mode themes, and a clean, simplified educational interface.

---

## ✨ Features & Highlights

### 🖥️ 1. Multi-Screen SPA Architecture
Navigate seamlessly between dedicated views without page reloads:
- **Dashboard View**: Overview banner, key statistics, and quick launcher cards.
- **Dedicated Technique Screens**: Individual full-screen views for each cipher technique (Caesar, Vigenère, Playfair, Hill 2×2, Atbash, Rail Fence).
- **Multi-Chapter Learning Hub**: Structured 8-chapter educational course with student memory hacks and progress tracking.
- **Assessments Screen**: Interactive practice quizzes, scoring, and explanations.
- **Comparison Matrix**: Detailed breakdown table comparing cipher properties.

---

### 🔑 2. Six Working Classical Cryptographic Ciphers
Every cipher includes fully functional **Encryption**, **Decryption**, validation, parameter controls, sample text loading, clipboard copying, and live visualizer step tracing:

1. **Caesar Cipher**: Monoalphabetic substitution with customizable shift key, modulo 26/36, case preservation, foreign char filtering, and shift index visualizer.
2. **Vigenère Cipher**: Polyalphabetic substitution using keyword alignment and visual repeating key alignment table.
3. **Playfair Cipher**: Digraph substitution using a generated 5×5 key matrix ('I'/'J' merge), filler 'X' pairing rules, and live 5×5 matrix cell highlighting.
4. **Hill Cipher (2×2 Matrix)**: Polygraphic linear algebra cipher featuring modular determinant calculation \(\det(K) \pmod{26}\), coprimality validation (\(\gcd(\det(K), 26) = 1\)), inverse matrix derivation, and step-by-step vector matrix multiplication breakdown.
5. **Atbash Cipher**: Keyless symmetric reverse alphabet substitution (A ↔ Z, B ↔ Y) with step mapping.
6. **Rail Fence Cipher**: Transposition cipher with customizable rail depth (2–10 rails) and interactive 2D zigzag rail fence matrix visualization.

---

### 💡 3. Student Memory Hacks & Exam Cheat Codes
Each chapter in the Learning Hub includes dedicated **Memory Hacks & Exam Cheat Codes** designed to help students master cryptographic mechanics for exams and quizzes:
- 🔑 **Caesar**: *"SHIFT & SLIDE (The Ruler Rule)"* (`ROT13 = Shift 13`).
- 🧩 **Vigenère**: *"KEY REPEAT & GRID LOOKUP"* (`Every L-th letter shares the same shift`).
- ▦ **Playfair**: *"PAIRS & 3 RULES (Right, Down, Swap)"* (Filler 'X' rule for duplicates).
- 📐 **Hill (2x2)**: *"VECTOR × MATRIX mod 26 (Coprime Check)"* (Valid \(\det\) list: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25).
- ⇄ **Atbash**: *"MIRROR ALPHABET"* (`New Index = 25 - Old Index`).
- 〰️ **Rail Fence**: *"ZIGZAG WAVE"* (Transposition leaves letter counts unchanged).
- 🔒 **CIA Triad**: *"CIA: Hide, Check, Serve"*.
- 🔐 **Modern vs Classical**: *"Classical = Paper Tricks | Modern = 256-bit Math Monsters"*.

---

### ☀️ 4. Light Mode & Dark Mode Theme Switcher
- Toggle between **Dark Mode** (deep slate/navy) and **Light Mode** (clean academic white/gray) with a single click in the navigation bar.
- Theme preference automatically saved in `localStorage`.

---

### 📖 5. Multi-Chapter Learning Hub (8 Chapters)
- **Chapter 1**: Caesar Cipher Fundamentals & Shift Math
- **Chapter 2**: Vigenère Cipher & Polyalphabetic Key Alignment
- **Chapter 3**: Playfair Cipher & 5×5 Digraph Grid Rules
- **Chapter 4**: Hill Cipher 2×2 Matrix Inverses & Linear Algebra
- **Chapter 5**: Atbash Reverse Substitution & Involutions
- **Chapter 6**: Rail Fence Transposition & Depth Rails
- **Chapter 7**: Information Security & CIA Triad Principles
- **Chapter 8**: Modern Cryptography (AES-256, RSA, ECC, SHA-256) vs. Classical Ciphers
- Interactive reading area with **Mark Chapter Complete** toggles and course progress bar.

---

### 🏆 6. Interactive Cybersecurity Assessments & Quizzes
- 8-question multiple-choice quiz testing cryptography & security concepts.
- Progress bar, score tracking (+10 pts per correct answer), immediate explanation feedback on option selection, and quiz retry option.

---

## 📂 Project Structure

```
.
├── index.html              # Multi-screen HTML SPA structure
├── style.css               # Dual-theme CSS system (Light & Dark mode), clean educational cards & layout
├── app.js                  # SPA view router, theme switcher, technique manager, learning hub & assessment engine
├── gemini-svg.svg          # Vector icon asset
├── ciphers/
│   ├── caesar.js           # Caesar cipher engine & step tracer
│   ├── vigenere.js         # Vigenère cipher engine & key alignment tracer
│   ├── playfair.js         # Playfair cipher 5x5 matrix builder & digraph tracer
│   ├── hill.js             # Hill cipher 2x2 matrix validator, modular inverse & vector tracer
│   ├── atbash.js           # Atbash symmetric reverse mapper
│   └── railfence.js        # Rail fence transposition engine & zigzag rail grid generator
├── .gitignore              # Standard git ignore configuration
├── LICENSE                 # MIT License file
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Requirements
- Any modern web browser (Chrome, Firefox, Edge, Safari).
- No external runtime dependencies or Node packages required!

### Local Quickstart
1. Clone or download the repository.
2. Launch a local web server:
   ```bash
   python3 -m http.server 8080
   ```
3. Open your browser and navigate to `http://localhost:8080` (or open `index.html` directly).

---

## 📄 License & Academic Disclaimer

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

> **Disclaimer**: This laboratory application is strictly for **educational and academic demonstration purposes**. Classical ciphers are historically significant but computationally weak and MUST NOT be used to protect sensitive real-world data. Modern applications should use established cryptographic standards such as AES-256 and RSA.
