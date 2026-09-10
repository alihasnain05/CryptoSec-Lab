/**
 * Atbash Cipher Engine & Visual Step Tracer
 */

const AtbashCipher = {
    process(text) {
        if (!text) return { result: '', steps: [] };

        let result = '';
        const steps = [];

        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            const isUpper = char >= 'A' && char <= 'Z';
            const isLower = char >= 'a' && char <= 'z';

            if (isUpper || isLower) {
                const base = isUpper ? 65 : 97;
                const idx = char.charCodeAt(0) - base;
                const newIdx = 25 - idx;
                const resChar = String.fromCharCode(newIdx + base);

                result += resChar;
                steps.push({
                    position: i,
                    original: char,
                    origIdx: idx,
                    newIdx: newIdx,
                    result: resChar,
                    isShifted: true
                });
            } else {
                result += char;
                steps.push({
                    position: i,
                    original: char,
                    origIdx: -1,
                    newIdx: -1,
                    result: char,
                    isShifted: false
                });
            }
        }

        return { result, steps };
    },

    encrypt(text) {
        return this.process(text);
    },

    decrypt(text) {
        return this.process(text);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AtbashCipher;
}
