/**
 * Cryptography & Information Security Lab — Main Application Controller & SPA Router
 */

const app = (() => {
    // --- Application State ---
    let state = {
        theme: 'dark',
        currentScreen: 'dashboard',
        currentTechnique: 'caesar',
        mode: 'encrypt',
        currentChapter: 'ch-1',
        completedChapters: new Set(),
        quizIndex: 0,
        quizScore: 0,
        quizAnswered: false
    };

    // --- Cipher Details Registry ---
    const techniquesData = {
        caesar: {
            title: 'Caesar Cipher',
            icon: '🔑',
            badge: 'Beginner',
            badgeClass: 'badge-easy',
            desc: 'A monoalphabetic substitution cipher shifting characters by a fixed shift key value modulo 26.',
            sample: 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG'
        },
        vigenere: {
            title: 'Vigenère Cipher',
            icon: '🧩',
            badge: 'Intermediate',
            badgeClass: 'badge-medium',
            desc: 'A polyalphabetic substitution cipher using a secret keyword for dynamic character shifting.',
            sample: 'ATTACK AT DAWN UNLESS WEATHER IS BAD'
        },
        playfair: {
            title: 'Playfair Cipher',
            icon: '▦',
            badge: 'Intermediate',
            badgeClass: 'badge-medium',
            desc: 'A digraph substitution cipher operating on pairs of letters using a generated 5×5 key matrix.',
            sample: 'INSTRUMENTATION AND CYBERSECURITY'
        },
        hill: {
            title: 'Hill Cipher (2x2)',
            icon: '📐',
            badge: 'Advanced',
            badgeClass: 'badge-hard',
            desc: 'A polygraphic substitution cipher using 2×2 matrix multiplication modulo 26 and linear algebra.',
            sample: 'HELP ME IF YOU CAN'
        },
        atbash: {
            title: 'Atbash Cipher',
            icon: '⇄',
            badge: 'Beginner',
            badgeClass: 'badge-easy',
            desc: 'A symmetric keyless monoalphabetic substitution cipher reversing the alphabet order (A ↔ Z).',
            sample: 'CONFIDENTIAL INFORMATION SECURITY'
        },
        railfence: {
            title: 'Rail Fence Cipher',
            icon: '〰️',
            badge: 'Beginner',
            badgeClass: 'badge-easy',
            desc: 'A transposition cipher writing letters in a zigzag pattern across multiple horizontal depth rails.',
            sample: 'DEFEND THE EAST WALL OF THE FORTRESS'
        }
    };

    // --- Chapter Materials Registry with Student Cheat Codes ---
    const chaptersData = {
        'ch-1': {
            badge: 'Chapter 1 of 8',
            title: 'Caesar Cipher Fundamentals',
            content: `
                <div style="background:var(--primary-blue-light); border:1px solid var(--primary-blue); border-radius:var(--radius-sm); padding:1rem; margin-bottom:1.5rem;">
                    <div style="font-weight:700; color:var(--primary-blue); font-size:0.95rem; margin-bottom:0.35rem;">💡 Student Memory Hack / Cheat Code</div>
                    <div style="font-size:0.9rem; color:var(--text-primary); font-weight:600;">"SHIFT & SLIDE (The Ruler Rule)"</div>
                    <div style="font-size:0.875rem; color:var(--text-secondary); margin-top:0.25rem;">
                        Imagine a 26-slot alphabet ruler. Slide forward by the Shift number. If you pass Z (25), wrap around to A (0)!
                        <br /><strong>Formula Cheat:</strong> <code>(Letter + Shift) mod 26</code> | <strong>Exam Tip:</strong> ROT13 is just Caesar with Shift = 13.
                    </div>
                </div>

                <div class="lesson-section">
                    <h4>🔍 Overview</h4>
                    <p>The Caesar Cipher is one of the earliest and simplest encryption techniques. Named after Julius Caesar, who used it with a shift of 3 to protect military communications.</p>
                </div>
                <div class="lesson-section">
                    <h4>⚡ How It Works</h4>
                    <p>Each letter in the plaintext is shifted down the alphabet by a fixed shift value. When shifting past 'Z', it wraps back around to 'A'.</p>
                    <div class="code-snippet">E_n(x) = (x + n) mod 26<br />D_n(x) = (x - n) mod 26</div>
                </div>
                <div class="lesson-section">
                    <h4>💡 Step-by-Step Example</h4>
                    <p>Plaintext: <strong>HELLO</strong> | Shift = 3</p>
                    <ul>
                        <li>H (7) + 3 = 10 → <strong>K</strong></li>
                        <li>E (4) + 3 = 7 → <strong>H</strong></li>
                        <li>L (11) + 3 = 14 → <strong>O</strong></li>
                        <li>L (11) + 3 = 14 → <strong>O</strong></li>
                        <li>O (14) + 3 = 17 → <strong>R</strong></li>
                    </ul>
                    <p style="margin-top:0.5rem;">Resulting Ciphertext: <strong>KHOOR</strong></p>
                </div>
                <div class="lesson-section">
                    <h4>🛡️ Weaknesses & Vulnerabilities</h4>
                    <p>Vulnerable to brute-force attacks (only 25 possible shift keys in the English alphabet) and frequency analysis.</p>
                </div>`
        },
        'ch-2': {
            badge: 'Chapter 2 of 8',
            title: 'Vigenère Cipher Mechanics',
            content: `
                <div style="background:var(--primary-blue-light); border:1px solid var(--primary-blue); border-radius:var(--radius-sm); padding:1rem; margin-bottom:1.5rem;">
                    <div style="font-weight:700; color:var(--primary-blue); font-size:0.95rem; margin-bottom:0.35rem;">💡 Student Memory Hack / Cheat Code</div>
                    <div style="font-size:0.9rem; color:var(--text-primary); font-weight:600;">"KEY REPEAT & SHIFT PER LETTER"</div>
                    <div style="font-size:0.875rem; color:var(--text-secondary); margin-top:0.25rem;">
                        Repeat keyword under message: <code>LEMONLEMON</code>. Each key letter gives a different Caesar shift (A=0, B=1, ... Z=25)!
                        <br /><strong>Formula Cheat:</strong> <code>Cipher_i = (Plain_i + Key_i) mod 26</code> | <strong>Exam Tip:</strong> If key length is L, every L-th letter shares the same shift!
                    </div>
                </div>

                <div class="lesson-section">
                    <h4>🔍 Overview</h4>
                    <p>The Vigenère Cipher is a polyalphabetic substitution cipher that uses a repeating secret keyword to shift each character dynamically.</p>
                </div>
                <div class="lesson-section">
                    <h4>⚡ How It Works</h4>
                    <p>Align the keyword repeatedly underneath the plaintext. Each letter's shift corresponds to the numerical value of the matching key letter (A=0, B=1, ... Z=25).</p>
                    <div class="code-snippet">C_i = (P_i + K_{i mod m}) mod 26</div>
                </div>
                <div class="lesson-section">
                    <h4>💡 Example Alignment</h4>
                    <p>Plaintext: <strong>ATTACKATDAWN</strong> | Key: <strong>LEMON</strong></p>
                    <div class="code-snippet">
                        Plain: A T T A C K A T D A W N<br />
                        Key:   L E M O N L E M O N L E<br />
                        Cipher:LX F O P V E F R N H R
                    </div>
                </div>`
        },
        'ch-3': {
            badge: 'Chapter 3 of 8',
            title: 'Playfair Cipher & Digraph Substitution',
            content: `
                <div style="background:var(--primary-blue-light); border:1px solid var(--primary-blue); border-radius:var(--radius-sm); padding:1rem; margin-bottom:1.5rem;">
                    <div style="font-weight:700; color:var(--primary-blue); font-size:0.95rem; margin-bottom:0.35rem;">💡 Student Memory Hack / Cheat Code</div>
                    <div style="font-size:0.9rem; color:var(--text-primary); font-weight:600;">"PAIRS & 3 RULES (Right, Down, Swap)"</div>
                    <div style="font-size:0.875rem; color:var(--text-secondary); margin-top:0.25rem;">
                        1. Merge I/J in 5x5 grid. 2. Split pairs (same letter? insert filler X!).<br />
                        <strong>Rule 1 (Same Row):</strong> Shift RIGHT ➡️<br />
                        <strong>Rule 2 (Same Col):</strong> Shift DOWN ⬇️<br />
                        <strong>Rule 3 (Rectangle):</strong> SWAP COLUMNS 🔀
                    </div>
                </div>

                <div class="lesson-section">
                    <h4>🔍 Overview</h4>
                    <p>Invented by Charles Wheatstone in 1854, the Playfair Cipher was the first practical digraph substitution cipher, encrypting pairs of letters instead of single letters.</p>
                </div>
                <div class="lesson-section">
                    <h4>⚡ How It Works</h4>
                    <p>Construct a 5×5 matrix using a keyword (combining 'I' and 'J'). Split plaintext into pairs. If duplicate letters occur in a pair (e.g. "LL"), insert filler 'X'. Apply geometric rules: Same Row → shift right; Same Column → shift down; Rectangle → swap column indices.</p>
                </div>`
        },
        'ch-4': {
            badge: 'Chapter 4 of 8',
            title: 'Hill Cipher & Linear Algebra',
            content: `
                <div style="background:var(--primary-blue-light); border:1px solid var(--primary-blue); border-radius:var(--radius-sm); padding:1rem; margin-bottom:1.5rem;">
                    <div style="font-weight:700; color:var(--primary-blue); font-size:0.95rem; margin-bottom:0.35rem;">💡 Student Memory Hack / Cheat Code</div>
                    <div style="font-size:0.9rem; color:var(--text-primary); font-weight:600;">"VECTOR × MATRIX mod 26 (The Coprime Check)"</div>
                    <div style="font-size:0.875rem; color:var(--text-secondary); margin-top:0.25rem;">
                        Multiply letter vector by 2x2 matrix mod 26.<br />
                        <strong>Exam Coprime Cheat:</strong> Matrix is ONLY valid if det(K) = (ad - bc) mod 26 is coprime to 26 (gcd = 1). Valid determinants: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25. Even numbers & 13 CANNOT be determinants!
                    </div>
                </div>

                <div class="lesson-section">
                    <h4>🔍 Overview</h4>
                    <p>Invented by mathematician Lester S. Hill in 1929, the Hill Cipher uses matrix multiplication modulo 26 to encrypt blocks of text simultaneously.</p>
                </div>
                <div class="lesson-section">
                    <h4>⚡ Matrix Invertibility Condition</h4>
                    <p>The 2×2 key matrix K must be invertible modulo 26. Its determinant det(K) must be non-zero and coprime to 26 (gcd(det(K), 26) = 1).</p>
                    <div class="code-snippet">C = (K · P) mod 26<br />P = (K⁻¹ · C) mod 26</div>
                </div>`
        },
        'ch-5': {
            badge: 'Chapter 5 of 8',
            title: 'Atbash Cipher & Reverse Substitution',
            content: `
                <div style="background:var(--primary-blue-light); border:1px solid var(--primary-blue); border-radius:var(--radius-sm); padding:1rem; margin-bottom:1.5rem;">
                    <div style="font-weight:700; color:var(--primary-blue); font-size:0.95rem; margin-bottom:0.35rem;">💡 Student Memory Hack / Cheat Code</div>
                    <div style="font-size:0.9rem; color:var(--text-primary); font-weight:600;">"MIRROR ALPHABET (First ↔ Last)"</div>
                    <div style="font-size:0.875rem; color:var(--text-secondary); margin-top:0.25rem;">
                        A ↔ Z, B ↔ Y, C ↔ X, D ↔ W.<br />
                        <strong>Formula Cheat:</strong> <code>New Index = 25 - Old Index</code> | <strong>Exam Tip:</strong> Atbash is its own inverse; applying it twice returns original text!
                    </div>
                </div>

                <div class="lesson-section">
                    <h4>🔍 Overview</h4>
                    <p>Atbash is a ancient keyless monoalphabetic substitution cipher originally created for the Hebrew alphabet. It maps the alphabet in reverse order (A ↔ Z, B ↔ Y).</p>
                </div>
                <div class="lesson-section">
                    <h4>⚡ Mechanics</h4>
                    <p>Because encryption and decryption use the exact same reverse mapping, Atbash is an involution (applying it twice yields original text).</p>
                </div>`
        },
        'ch-6': {
            badge: 'Chapter 6 of 8',
            title: 'Rail Fence Cipher & Transposition',
            content: `
                <div style="background:var(--primary-blue-light); border:1px solid var(--primary-blue); border-radius:var(--radius-sm); padding:1rem; margin-bottom:1.5rem;">
                    <div style="font-weight:700; color:var(--primary-blue); font-size:0.95rem; margin-bottom:0.35rem;">💡 Student Memory Hack / Cheat Code</div>
                    <div style="font-size:0.9rem; color:var(--text-primary); font-weight:600;">"ZIGZAG WAVE (Bounce & Read Rows)"</div>
                    <div style="font-size:0.875rem; color:var(--text-secondary); margin-top:0.25rem;">
                        Write letters diagonally down and up across N rails like a roller coaster. Read horizontally row by row to produce ciphertext.<br />
                        <strong>Exam Tip:</strong> Letter counts and frequencies NEVER change because it's a Transposition cipher, not substitution!
                    </div>
                </div>

                <div class="lesson-section">
                    <h4>🔍 Overview</h4>
                    <p>The Rail Fence Cipher is a transposition cipher. Unlike substitution ciphers, it rearranges character positions without altering letter identities.</p>
                </div>
                <div class="lesson-section">
                    <h4>⚡ How It Works</h4>
                    <p>Write letters diagonally downwards on imaginary rails, then bounce back up diagonally. Read row by row to produce ciphertext.</p>
                </div>`
        },
        'ch-7': {
            badge: 'Chapter 7 of 8',
            title: 'Information Security & CIA Triad',
            content: `
                <div style="background:var(--primary-blue-light); border:1px solid var(--primary-blue); border-radius:var(--radius-sm); padding:1rem; margin-bottom:1.5rem;">
                    <div style="font-weight:700; color:var(--primary-blue); font-size:0.95rem; margin-bottom:0.35rem;">💡 Student Memory Hack / Cheat Code</div>
                    <div style="font-size:0.9rem; color:var(--text-primary); font-weight:600;">"CIA: Hide, Check, Serve"</div>
                    <div style="font-size:0.875rem; color:var(--text-secondary); margin-top:0.25rem;">
                        <strong>C</strong>onfidentiality = Keep secret (Encryption)<br />
                        <strong>I</strong>ntegrity = Prevent tampering (Hashing)<br />
                        <strong>A</strong>vailability = Keep running (Resist DoS)
                    </div>
                </div>

                <div class="lesson-section">
                    <h4>🔒 Confidentiality</h4>
                    <p>Ensures sensitive information is accessible only to authorized entities. Encryption protects data confidentiality.</p>
                </div>
                <div class="lesson-section">
                    <h4>🛡️ Integrity</h4>
                    <p>Guarantees data remains accurate, complete, and unaltered during storage or transmission (using cryptographic hashes like SHA-256).</p>
                </div>
                <div class="lesson-section">
                    <h4>⚡ Availability</h4>
                    <p>Ensures system services and data remain accessible to authorized users whenever required, resisting Denial-of-Service (DoS) attacks.</p>
                </div>`
        },
        'ch-8': {
            badge: 'Chapter 8 of 8',
            title: 'Modern Cryptography vs Classical Ciphers',
            content: `
                <div style="background:var(--primary-blue-light); border:1px solid var(--primary-blue); border-radius:var(--radius-sm); padding:1rem; margin-bottom:1.5rem;">
                    <div style="font-weight:700; color:var(--primary-blue); font-size:0.95rem; margin-bottom:0.35rem;">💡 Student Memory Hack / Cheat Code</div>
                    <div style="font-size:0.9rem; color:var(--text-primary); font-weight:600;">"CLASSICAL = Paper Tricks | MODERN = Math Monsters"</div>
                    <div style="font-size:0.875rem; color:var(--text-secondary); margin-top:0.25rem;">
                        Classical ciphers fall to letter frequency counts in seconds.<br />
                        Modern <strong>AES-256</strong> (Symmetric) and <strong>RSA/ECC</strong> (Asymmetric) use 256+ bit math keys that take billions of years to brute force!
                    </div>
                </div>

                <div class="lesson-section">
                    <h4>⚠️ Why Classical Ciphers Are Insecure Today</h4>
                    <p>With modern computer processing speeds, classical ciphers can be cracked in less than a millisecond using letter frequency analysis or exhaustive key search.</p>
                </div>
                <div class="lesson-section">
                    <h4>🔐 Modern Cryptographic Standards</h4>
                    <ul>
                        <li><strong>AES-256:</strong> Advanced Encryption Standard (Symmetric encryption gold standard).</li>
                        <li><strong>RSA / ECC:</strong> Asymmetric public-key cryptography for key exchange and digital signatures.</li>
                        <li><strong>SHA-256 / SHA-3:</strong> Secure cryptographic hashing algorithms.</li>
                    </ul>
                </div>`
        }
    };

    // --- DOM Cache ---
    let dom = {};

    function initDOM() {
        dom.themeToggle = document.getElementById('theme-toggle');
        dom.themeToggleIcon = document.getElementById('theme-toggle-icon');
        dom.mobileToggle = document.getElementById('mobile-toggle');
        dom.navMenu = document.getElementById('nav-menu');
        dom.toastContainer = document.getElementById('toast-container');

        // Workspace elements
        dom.workspaceInput = document.getElementById('workspace-input');
        dom.workspaceOutput = document.getElementById('workspace-output');
        dom.inputCharCount = document.getElementById('input-char-count');
        dom.outputCharCount = document.getElementById('output-char-count');
        dom.transformStatus = document.getElementById('transform-status');
        dom.visualizerContent = document.getElementById('visualizer-content');
        dom.modeEncrypt = document.getElementById('mode-encrypt');
        dom.modeDecrypt = document.getElementById('mode-decrypt');
        dom.workspaceInputLabel = document.getElementById('workspace-input-label');
        dom.workspaceOutputLabel = document.getElementById('workspace-output-label');
    }

    // --- Toast System ---
    function showToast(message, type = 'info') {
        if (!dom.toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        const icon = type === 'success' ? '✓' : type === 'error' ? '⚠️' : 'ℹ️';
        toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
        dom.toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 250);
        }, 2800);
    }

    // --- Theme Switcher ---
    function initTheme() {
        const savedTheme = localStorage.getItem('crypto-theme') || 'dark';
        setTheme(savedTheme);
        if (dom.themeToggle) {
            dom.themeToggle.addEventListener('click', toggleTheme);
        }
    }

    function setTheme(theme) {
        state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('crypto-theme', theme);
        if (dom.themeToggleIcon) {
            dom.themeToggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    function toggleTheme() {
        setTheme(state.theme === 'dark' ? 'light' : 'dark');
        showToast(`Switched to ${state.theme} mode`, 'info');
    }

    // --- SPA View Navigation Router ---
    function navigateTo(screenId, param = null) {
        state.currentScreen = screenId;

        // Update View Screens
        document.querySelectorAll('.view-screen').forEach(scr => {
            scr.classList.remove('active');
        });
        const targetScreen = document.getElementById(`screen-${screenId}`);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }

        // Update Active Nav Link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-screen') === screenId) {
                link.classList.add('active');
            }
        });

        // Close mobile drawer if open
        if (dom.navMenu) dom.navMenu.classList.remove('open');

        // Parameter handling
        if (screenId === 'technique') {
            const techKey = param || state.currentTechnique || 'caesar';
            switchTechnique(techKey);
        } else if (screenId === 'learning') {
            const chId = param || state.currentChapter || 'ch-1';
            loadChapter(chId);
        } else if (screenId === 'assessments') {
            loadQuizQuestion();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- Technique Workspace Switcher ---
    function switchTechnique(techKey) {
        state.currentTechnique = techKey;
        const data = techniquesData[techKey] || techniquesData.caesar;

        // Update Subnav Active State
        document.querySelectorAll('.tech-subnav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('onclick')?.includes(`'${techKey}'`)) {
                btn.classList.add('active');
            }
        });

        // Update Header
        document.getElementById('tech-header-icon').textContent = data.icon;
        document.getElementById('tech-header-title').textContent = `${data.title} Workspace`;
        document.getElementById('tech-header-desc').textContent = data.desc;
        const diffBadge = document.getElementById('tech-header-difficulty');
        diffBadge.textContent = data.badge;
        diffBadge.className = `badge ${data.badgeClass}`;

        // Toggle Control Panels
        document.querySelectorAll('.tech-ctrl-panel').forEach(panel => {
            panel.style.display = 'none';
        });
        const ctrlPanel = document.getElementById(`tech-ctrl-${techKey}`);
        if (ctrlPanel) ctrlPanel.style.display = 'block';

        updateTransformation();
    }

    // Input listeners for transformation
    function bindWorkspaceEvents() {
        if (!dom.workspaceInput) return;

        dom.workspaceInput.addEventListener('input', () => {
            dom.inputCharCount.textContent = `${dom.workspaceInput.value.length} characters`;
            updateTransformation();
        });

        if (dom.modeEncrypt && dom.modeDecrypt) {
            dom.modeEncrypt.addEventListener('click', () => {
                state.mode = 'encrypt';
                dom.modeEncrypt.classList.add('active');
                dom.modeDecrypt.classList.remove('active');
                dom.workspaceInputLabel.textContent = 'Plaintext Input';
                dom.workspaceOutputLabel.textContent = 'Ciphertext Result';
                updateTransformation();
            });

            dom.modeDecrypt.addEventListener('click', () => {
                state.mode = 'decrypt';
                dom.modeDecrypt.classList.add('active');
                dom.modeEncrypt.classList.remove('active');
                dom.workspaceInputLabel.textContent = 'Ciphertext Input';
                dom.workspaceOutputLabel.textContent = 'Plaintext Result';
                updateTransformation();
            });
        }

        // Control Fields Listeners
        ['caesar-shift', 'caesar-mod', 'caesar-case', 'caesar-foreign', 'vigenere-key', 'playfair-key', 'railfence-rails', 'hill-m00', 'hill-m01', 'hill-m10', 'hill-m11'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', updateTransformation);
                el.addEventListener('change', updateTransformation);
            }
        });

        // Sample Text Button
        document.getElementById('btn-sample')?.addEventListener('click', () => {
            const sample = techniquesData[state.currentTechnique]?.sample || 'HELLO WORLD SECURITY LAB';
            dom.workspaceInput.value = sample;
            dom.inputCharCount.textContent = `${sample.length} characters`;
            updateTransformation();
            showToast('Loaded sample text into workspace', 'info');
        });

        // Clear Button
        document.getElementById('btn-clear')?.addEventListener('click', () => {
            dom.workspaceInput.value = '';
            dom.workspaceOutput.value = '';
            dom.inputCharCount.textContent = '0 characters';
            dom.outputCharCount.textContent = '0 characters';
            dom.visualizerContent.innerHTML = '<p style="color:var(--text-muted);">Enter text above to view live transformation steps.</p>';
            showToast('Workspace cleared', 'info');
        });

        // Copy Button
        document.getElementById('btn-copy')?.addEventListener('click', () => {
            if (!dom.workspaceOutput.value) {
                showToast('No output to copy!', 'error');
                return;
            }
            navigator.clipboard.writeText(dom.workspaceOutput.value).then(() => {
                showToast('Output copied to clipboard!', 'success');
            });
        });
    }

    // --- Core Transformation Orchestrator ---
    function updateTransformation() {
        const text = dom.workspaceInput?.value;
        const isDecode = state.mode === 'decrypt';
        let resData = { result: '', steps: [] };

        if (!text) {
            if (dom.workspaceOutput) dom.workspaceOutput.value = '';
            if (dom.outputCharCount) dom.outputCharCount.textContent = '0 characters';
            if (dom.visualizerContent) dom.visualizerContent.innerHTML = '<p style="color:var(--text-muted);">Enter text above to view live transformation steps.</p>';
            return;
        }

        try {
            switch (state.currentTechnique) {
                case 'caesar': {
                    const shift = parseInt(document.getElementById('caesar-shift').value) || 3;
                    const mod = parseInt(document.getElementById('caesar-mod').value) || 26;
                    const lCase = document.getElementById('caesar-case').value;
                    const fChars = document.getElementById('caesar-foreign').value;
                    resData = CaesarCipher.process(text, shift, isDecode, mod, 'abcdefghijklmnopqrstuvwxyz', lCase, fChars);
                    renderCaesarVisualizer(resData);
                    break;
                }
                case 'vigenere': {
                    const key = document.getElementById('vigenere-key').value || 'LEMON';
                    resData = VigenereCipher.process(text, key, isDecode);
                    renderVigenereVisualizer(resData);
                    break;
                }
                case 'playfair': {
                    const key = document.getElementById('playfair-key').value || 'MONARCHY';
                    resData = PlayfairCipher.process(text, key, isDecode);
                    renderPlayfairVisualizer(resData);
                    break;
                }
                case 'hill': {
                    const m00 = parseInt(document.getElementById('hill-m00').value) || 5;
                    const m01 = parseInt(document.getElementById('hill-m01').value) || 8;
                    const m10 = parseInt(document.getElementById('hill-m10').value) || 17;
                    const m11 = parseInt(document.getElementById('hill-m11').value) || 3;
                    const matrix = [[m00, m01], [m10, m11]];
                    
                    const statusEl = document.getElementById('hill-status-msg');
                    const val = HillCipher.validateMatrix(matrix);
                    if (!val.isValid) {
                        statusEl.style.color = 'var(--accent-red)';
                        statusEl.textContent = `❌ Invalid Key Matrix: ${val.reason}`;
                        dom.workspaceOutput.value = 'ERROR: Non-invertible key matrix';
                        dom.outputCharCount.textContent = '0 characters';
                        dom.visualizerContent.innerHTML = `<p style="color:var(--accent-red);">${val.reason}</p>`;
                        return;
                    } else {
                        statusEl.style.color = 'var(--accent-emerald)';
                        statusEl.textContent = `✓ Valid Key Matrix (det = ${val.det}, invDet = ${val.invDet})`;
                    }

                    resData = HillCipher.process(text, matrix, isDecode);
                    renderHillVisualizer(resData);
                    break;
                }
                case 'atbash': {
                    resData = AtbashCipher.process(text);
                    renderAtbashVisualizer(resData);
                    break;
                }
                case 'railfence': {
                    const rails = parseInt(document.getElementById('railfence-rails').value) || 3;
                    resData = RailFenceCipher.process(text, rails, isDecode);
                    renderRailFenceVisualizer(resData);
                    break;
                }
            }

            if (dom.workspaceOutput) dom.workspaceOutput.value = resData.result;
            if (dom.outputCharCount) dom.outputCharCount.textContent = `${resData.result.length} characters`;
            if (dom.transformStatus) dom.transformStatus.textContent = '✓ Transformed';
        } catch (err) {
            console.error(err);
        }
    }

    // --- Visualizer Render Functions ---
    function renderCaesarVisualizer(data) {
        let html = `<div style="margin-bottom:0.5rem; font-weight:600; color:var(--primary-blue); font-size:0.875rem;">Shift Applied: ${data.shift} (Modulus ${data.mod})</div>`;
        html += `<div style="display:flex; flex-wrap:wrap; gap:6px;">`;
        data.steps.slice(0, 30).forEach(st => {
            if (st.isShifted) {
                html += `
                    <div style="background:var(--bg-card); border:1px solid var(--border-color); padding:4px 8px; border-radius:4px; text-align:center; font-family:var(--font-mono); font-size:0.85rem;">
                        <span style="color:var(--text-muted);">${st.original}</span>
                        <span style="color:var(--primary-blue);"> → </span>
                        <span style="color:var(--accent-emerald); font-weight:700;">${st.result}</span>
                    </div>`;
            }
        });
        html += `</div>`;
        dom.visualizerContent.innerHTML = html;
    }

    function renderVigenereVisualizer(data) {
        let html = `<div style="margin-bottom:0.5rem; font-weight:600; color:var(--primary-blue); font-size:0.875rem;">Key Repeated Alignment: "${data.key}"</div>`;
        html += `<div style="display:flex; flex-direction:column; gap:4px; font-family:var(--font-mono); font-size:0.875rem; overflow-x:auto;">`;
        let pRow = '<span style="color:var(--text-muted); width:70px; display:inline-block;">Text:</span>';
        let kRow = '<span style="color:var(--primary-blue); width:70px; display:inline-block;">Key:</span>';
        let rRow = '<span style="color:var(--accent-emerald); width:70px; display:inline-block;">Result:</span>';

        data.steps.slice(0, 25).forEach(st => {
            pRow += `<span style="display:inline-block; width:22px; text-align:center;">${st.original}</span>`;
            kRow += `<span style="display:inline-block; width:22px; text-align:center; font-weight:700;">${st.keyChar}</span>`;
            rRow += `<span style="display:inline-block; width:22px; text-align:center; font-weight:700; color:var(--accent-emerald);">${st.result}</span>`;
        });

        html += `<div>${pRow}</div><div>${kRow}</div><div>${rRow}</div></div>`;
        dom.visualizerContent.innerHTML = html;
    }

    function renderPlayfairVisualizer(data) {
        let html = `<div style="display:flex; gap:2rem; flex-wrap:wrap; align-items:flex-start;">`;
        html += `<div><div style="font-weight:600; color:var(--primary-blue); margin-bottom:0.5rem; font-size:0.875rem;">5×5 Generated Key Matrix:</div><div class="playfair-visual-grid">`;
        data.grid.forEach(row => {
            row.forEach(cell => {
                html += `<div class="playfair-cell">${cell}</div>`;
            });
        });
        html += `</div></div>`;

        html += `<div style="flex:1;"><div style="font-weight:600; color:var(--primary-blue); margin-bottom:0.5rem; font-size:0.875rem;">Pair Transformation Steps:</div><div style="display:flex; flex-direction:column; gap:6px; max-height:200px; overflow-y:auto;">`;
        data.steps.slice(0, 10).forEach(st => {
            html += `
                <div style="display:flex; align-items:center; gap:0.5rem; font-family:var(--font-mono); font-size:0.85rem;">
                    <span style="padding:2px 6px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:4px; color:var(--text-muted);">${st.inPair.join('')}</span>
                    <span style="color:var(--primary-blue);"> → </span>
                    <span style="padding:2px 6px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:4px; color:var(--accent-emerald); font-weight:700;">${st.outPair.join('')}</span>
                    <span style="font-size:0.75rem; color:var(--text-dim);">(${st.rule})</span>
                </div>`;
        });
        html += `</div></div></div>`;
        dom.visualizerContent.innerHTML = html;
    }

    function renderHillVisualizer(data) {
        let html = `<div style="margin-bottom:0.5rem; font-weight:600; color:var(--primary-blue); font-size:0.875rem;">Hill 2×2 Vector Multiplication Steps:</div>`;
        html += `<div style="display:flex; flex-direction:column; gap:6px; font-family:var(--font-mono); font-size:0.85rem;">`;
        data.steps.slice(0, 8).forEach(st => {
            html += `
                <div style="background:var(--bg-card); border:1px solid var(--border-color); padding:6px 10px; border-radius:4px;">
                    Pair [${st.pair[0]}, ${st.pair[1]}] → Vector [${st.pVector[0]}, ${st.pVector[1]}] × Matrix [[${st.matrix[0].join(',')})], [${st.matrix[1].join(',')})]] mod 26 = [${st.cVector[0]}, ${st.cVector[1]}] → <span style="color:var(--accent-emerald); font-weight:700;">${st.outPair.join('')}</span>
                </div>`;
        });
        html += `</div>`;
        dom.visualizerContent.innerHTML = html;
    }

    function renderAtbashVisualizer(data) {
        let html = `<div style="margin-bottom:0.5rem; font-weight:600; color:var(--primary-blue); font-size:0.875rem;">Atbash Reverse Alphabet Map (A ↔ Z):</div>`;
        html += `<div style="display:flex; flex-wrap:wrap; gap:6px;">`;
        data.steps.slice(0, 25).forEach(st => {
            if (st.isShifted) {
                html += `<div style="padding:4px 8px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:4px; font-family:var(--font-mono); font-size:0.85rem;"><span style="color:var(--text-muted);">${st.original}</span> ↔ <span style="color:var(--accent-emerald); font-weight:700;">${st.result}</span></div>`;
            }
        });
        html += `</div>`;
        dom.visualizerContent.innerHTML = html;
    }

    function renderRailFenceVisualizer(data) {
        let html = `<div style="margin-bottom:0.5rem; font-weight:600; color:var(--primary-blue); font-size:0.875rem;">Rail Fence Zigzag Grid (${data.rails} Rails):</div>`;
        html += `<table class="rail-grid-table">`;
        data.fence.forEach(row => {
            html += `<tr>`;
            row.forEach(cell => {
                if (cell !== null) {
                    html += `<td class="rail-cell-active">${cell}</td>`;
                } else {
                    html += `<td></td>`;
                }
            });
            html += `</tr>`;
        });
        html += `</table>`;
        dom.visualizerContent.innerHTML = html;
    }

    // --- Learning Hub Chapter Controller ---
    function loadChapter(chId) {
        state.currentChapter = chId;
        const data = chaptersData[chId] || chaptersData['ch-1'];

        // Sidebar active class
        document.querySelectorAll('.chapter-item-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-ch') === chId) {
                btn.classList.add('active');
            }
        });

        // Update Reading Card
        document.getElementById('ch-read-badge').textContent = data.badge;
        document.getElementById('ch-read-title').textContent = data.title;
        document.getElementById('ch-read-body').innerHTML = data.content;

        // Button state
        const btnMark = document.getElementById('btn-mark-complete');
        if (btnMark) {
            if (state.completedChapters.has(chId)) {
                btnMark.textContent = '✓ Completed';
                btnMark.className = 'btn btn-primary';
            } else {
                btnMark.textContent = 'Mark Chapter Complete';
                btnMark.className = 'btn btn-outline';
            }
        }
    }

    function toggleChapterComplete() {
        const chId = state.currentChapter;
        if (state.completedChapters.has(chId)) {
            state.completedChapters.delete(chId);
            showToast('Chapter marked incomplete', 'info');
        } else {
            state.completedChapters.add(chId);
            showToast('Chapter marked complete!', 'success');
        }
        updateLearningProgress();
        loadChapter(chId);
    }

    function updateLearningProgress() {
        const total = Object.keys(chaptersData).length;
        const count = state.completedChapters.size;
        const pct = Math.round((count / total) * 100);

        const txt = document.getElementById('learning-progress-txt');
        const fill = document.getElementById('learning-progress-fill');
        if (txt) txt.textContent = `${pct}%`;
        if (fill) fill.style.width = `${pct}%`;

        // Update checkmarks in sidebar
        document.querySelectorAll('.chapter-item-btn').forEach(btn => {
            const ch = btn.getAttribute('data-ch');
            const checkEl = btn.querySelector('.chapter-status-check');
            if (checkEl) {
                checkEl.textContent = state.completedChapters.has(ch) ? '✓' : '';
            }
        });
    }

    function nextChapter() {
        const keys = Object.keys(chaptersData);
        const idx = keys.indexOf(state.currentChapter);
        if (idx !== -1 && idx + 1 < keys.length) {
            loadChapter(keys[idx + 1]);
        } else {
            showToast('You have reached the final chapter!', 'success');
        }
    }

    // --- Assessments Engine ---
    const quizQuestions = [
        {
            question: "What primary goal of the CIA Triad does encryption protect during data transmission?",
            options: ["Availability", "Confidentiality", "Integrity", "Non-repudiation"],
            answer: 1,
            explanation: "Encryption converts readable plaintext into unreadable ciphertext, ensuring Confidentiality so unauthorized interceptors cannot read the message."
        },
        {
            question: "Why is the Caesar Cipher considered insecure for modern communication?",
            options: ["It requires a 4096-bit key", "It has only 25 possible shift keys, vulnerable to brute-force", "It uses matrix multiplication", "It alters character identities"],
            answer: 1,
            explanation: "The Caesar Cipher has a key space of only 25 possible shifts for the English alphabet, which can be brute-forced instantly by any computer."
        },
        {
            question: "Which classical cipher encrypts pairs of letters (digraphs) using a 5×5 matrix?",
            options: ["Caesar Cipher", "Rail Fence Cipher", "Playfair Cipher", "Atbash Cipher"],
            answer: 2,
            explanation: "The Playfair Cipher uses a 5×5 key matrix grid to substitute pairs of letters (digraphs) according to specific geometric rules."
        },
        {
            question: "What mathematical branch forms the core foundation of the Hill Cipher?",
            options: ["Linear Algebra & Matrix Multiplication", "Calculus & Derivatives", "Quantum Probability", "Geometry & Angles"],
            answer: 0,
            explanation: "The Hill Cipher represents blocks of text as numerical vectors and multiplies them by an N×N key matrix modulo 26."
        },
        {
            question: "What condition MUST a 2×2 key matrix satisfy to be valid for the Hill Cipher?",
            options: ["Its determinant must equal 0", "Its determinant modulo 26 must be coprime to 26 (gcd = 1)", "All elements must be prime numbers", "It must be a symmetric matrix"],
            answer: 1,
            explanation: "For a matrix to have a modular multiplicative inverse (required for decryption), its determinant modulo 26 must share no common factors with 26 (gcd(det, 26) = 1)."
        },
        {
            question: "Which classical cipher is keyless and maps 'A' to 'Z', 'B' to 'Y' symmetrically?",
            options: ["Vigenère Cipher", "Atbash Cipher", "Hill Cipher", "Rail Fence Cipher"],
            answer: 1,
            explanation: "The Atbash Cipher is a monoalphabetic substitution cipher that reverses the alphabet order, requiring no key."
        },
        {
            question: "Why does the Rail Fence Cipher leave single-letter frequencies identical to plaintext?",
            options: ["It is a substitution cipher", "It is a transposition cipher that only moves character positions", "It converts letters to numbers", "It uses XOR operations"],
            answer: 1,
            explanation: "Transposition ciphers like Rail Fence rearrange letter positions without substituting characters, preserving letter counts exactly."
        },
        {
            question: "Which modern symmetric algorithm is widely used today to replace classical ciphers?",
            options: ["Caesar-256", "Vigenère-Plus", "AES-256 (Advanced Encryption Standard)", "Playfair-Pro"],
            answer: 2,
            explanation: "AES-256 is the modern gold standard symmetric encryption algorithm used globally by governments, financial institutions, and security protocols."
        }
    ];

    function loadQuizQuestion() {
        const q = quizQuestions[state.quizIndex];
        state.quizAnswered = false;

        const qNum = document.getElementById('quiz-question-number');
        const qScore = document.getElementById('quiz-score');
        const fill = document.getElementById('quiz-progress-fill');

        if (qNum) qNum.textContent = `Question ${state.quizIndex + 1} of ${quizQuestions.length}`;
        if (qScore) qScore.textContent = `Score: ${state.quizScore}`;
        if (fill) fill.style.width = `${((state.quizIndex) / quizQuestions.length) * 100}%`;

        const qTxt = document.getElementById('quiz-question');
        const optsContainer = document.getElementById('quiz-options');
        const expBox = document.getElementById('quiz-explanation');
        const nextBtn = document.getElementById('quiz-next-btn');

        if (!qTxt || !optsContainer) return;

        qTxt.textContent = q.question;
        optsContainer.innerHTML = '';
        if (expBox) expBox.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt-btn';
            btn.textContent = `${String.fromCharCode(65 + idx)}. ${opt}`;
            btn.addEventListener('click', () => handleQuizAnswer(idx, btn));
            optsContainer.appendChild(btn);
        });
    }

    function handleQuizAnswer(selectedIndex, btnEl) {
        if (state.quizAnswered) return;
        state.quizAnswered = true;

        const q = quizQuestions[state.quizIndex];
        const allOptionBtns = document.querySelectorAll('.quiz-opt-btn');

        allOptionBtns.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === q.answer) {
                btn.classList.add('correct');
            }
        });

        if (selectedIndex === q.answer) {
            state.quizScore += 10;
            document.getElementById('quiz-score').textContent = `Score: ${state.quizScore}`;
            showToast('+10 points! Correct answer.', 'success');
        } else {
            btnEl.classList.add('wrong');
            showToast('Incorrect answer.', 'error');
        }

        const expBox = document.getElementById('quiz-explanation');
        const nextBtn = document.getElementById('quiz-next-btn');
        if (expBox) {
            expBox.textContent = q.explanation;
            expBox.style.display = 'block';
        }
        if (nextBtn) nextBtn.style.display = 'block';
    }

    // --- Initialization ---
    function init() {
        initDOM();
        initTheme();
        bindWorkspaceEvents();

        // Nav click listeners
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const screen = link.getAttribute('data-screen');
                if (screen) navigateTo(screen);
            });
        });

        // Mobile Drawer Toggle
        if (dom.mobileToggle && dom.navMenu) {
            dom.mobileToggle.addEventListener('click', () => {
                dom.navMenu.classList.toggle('open');
            });
        }

        // Quiz next button
        document.getElementById('quiz-next-btn')?.addEventListener('click', () => {
            state.quizIndex++;
            if (state.quizIndex < quizQuestions.length) {
                loadQuizQuestion();
            } else {
                document.getElementById('quiz-question-container').style.display = 'none';
                document.getElementById('quiz-result-container').style.display = 'block';
                document.getElementById('quiz-progress-fill').style.width = '100%';
                document.getElementById('quiz-final-score').textContent = `Final Score: ${state.quizScore} / ${quizQuestions.length * 10} points!`;
            }
        });

        document.getElementById('quiz-retry-btn')?.addEventListener('click', () => {
            state.quizIndex = 0;
            state.quizScore = 0;
            document.getElementById('quiz-result-container').style.display = 'none';
            document.getElementById('quiz-question-container').style.display = 'block';
            loadQuizQuestion();
        });

        // Default Navigation
        navigateTo('dashboard');
    }

    return {
        init,
        navigateTo,
        switchTechnique,
        loadChapter,
        toggleChapterComplete,
        nextChapter,
        toggleTheme
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
