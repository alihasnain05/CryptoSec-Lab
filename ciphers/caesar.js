/**
 * Caesar Cipher Engine & Visual Step Tracer
 */

const CaesarCipher = {
    /**
     * Cleans or filters text based on foreign character setting
     */
    cleanText(text, foreignCharsMode) {
        if (foreignCharsMode === 'remove' || foreignCharsMode === '1') {
            return text.replace(/[^a-zA-Z0-9 ]/g, '');
        }
        return text;
    },

    /**
     * Core Caesar shift function
     */
    process(text, shift, isDecode = false, mod = 26, charset = 'abcdefghijklmnopqrstuvwxyz', letterCase = 'maintain', foreignCharsMode = 'ignore') {
        if (!text) return { result: '', steps: [] };

        text = this.cleanText(text, foreignCharsMode);
        charset = charset.toLowerCase();
        mod = parseInt(mod) || 26;
        shift = parseInt(shift) || 0;
        if (isDecode) {
            shift = -shift;
        }

        let result = '';
        const steps = [];

        for (let i = 0; i < text.length; i++) {
            const originalChar = text.charAt(i);
            const lowerChar = originalChar.toLowerCase();
            const index = charset.indexOf(lowerChar);

            if (index !== -1) {
                let newIndex = (index + shift) % mod;
                if (newIndex < 0) newIndex += mod;

                let shiftedChar = charset[newIndex];
                if (originalChar === originalChar.toUpperCase() && originalChar !== originalChar.toLowerCase()) {
                    shiftedChar = shiftedChar.toUpperCase();
                }

                result += shiftedChar;
                steps.push({
                    position: i,
                    original: originalChar,
                    originalIndex: index,
                    shiftedIndex: newIndex,
                    result: shiftedChar,
                    isShifted: true
                });
            } else {
                result += originalChar;
                steps.push({
                    position: i,
                    original: originalChar,
                    originalIndex: -1,
                    shiftedIndex: -1,
                    result: originalChar,
                    isShifted: false
                });
            }
        }

        if (letterCase === 'lower' || letterCase === '2') {
            result = result.toLowerCase();
        } else if (letterCase === 'upper' || letterCase === '3') {
            result = result.toUpperCase();
        }

        return { result, steps, shift: (shift % mod + mod) % mod, mod, charset };
    },

    encrypt(text, shift = 3, mod = 26, charset = 'abcdefghijklmnopqrstuvwxyz', letterCase = 'maintain', foreignCharsMode = 'ignore') {
        return this.process(text, shift, false, mod, charset, letterCase, foreignCharsMode);
    },

    decrypt(text, shift = 3, mod = 26, charset = 'abcdefghijklmnopqrstuvwxyz', letterCase = 'maintain', foreignCharsMode = 'ignore') {
        return this.process(text, shift, true, mod, charset, letterCase, foreignCharsMode);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CaesarCipher;
}
