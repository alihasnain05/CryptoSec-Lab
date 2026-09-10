/**
 * Vigenère Cipher Engine & Visual Step Tracer
 */

const VigenereCipher = {
    sanitizeKey(key) {
        return key.toUpperCase().replace(/[^A-Z]/g, '');
    },

    process(text, key, isDecode = false) {
        if (!text) return { result: '', steps: [], key: '' };
        
        const cleanKey = this.sanitizeKey(key) || 'KEY';
        let result = '';
        const steps = [];
        let keyIndex = 0;

        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            const isUpper = char >= 'A' && char <= 'Z';
            const isLower = char >= 'a' && char <= 'z';

            if (isUpper || isLower) {
                const base = isUpper ? 65 : 97;
                const pVal = char.charCodeAt(0) - base;
                const kChar = cleanKey[keyIndex % cleanKey.length];
                const kVal = kChar.charCodeAt(0) - 65;

                let cVal;
                if (!isDecode) {
                    cVal = (pVal + kVal) % 26;
                } else {
                    cVal = (pVal - kVal + 26) % 26;
                }

                const resChar = String.fromCharCode(cVal + base);
                result += resChar;

                steps.push({
                    position: i,
                    original: char,
                    keyChar: kChar,
                    keyValue: kVal,
                    plainValue: pVal,
                    cipherValue: cVal,
                    result: resChar,
                    isShifted: true
                });

                keyIndex++;
            } else {
                result += char;
                steps.push({
                    position: i,
                    original: char,
                    keyChar: '-',
                    keyValue: 0,
                    plainValue: -1,
                    cipherValue: -1,
                    result: char,
                    isShifted: false
                });
            }
        }

        return { result, steps, key: cleanKey };
    },

    encrypt(text, key = 'KEY') {
        return this.process(text, key, false);
    },

    decrypt(text, key = 'KEY') {
        return this.process(text, key, true);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = VigenereCipher;
}
