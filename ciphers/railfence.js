/**
 * Rail Fence Cipher Engine & Visual Rail Grid Generator
 */

const RailFenceCipher = {
    process(text, rails = 3, isDecode = false) {
        rails = Math.max(2, parseInt(rails) || 3);
        if (!text) return { result: '', fence: [], rails };

        const len = text.length;
        // Create 2D grid of size (rails x len) initialized with null
        const fence = Array.from({ length: rails }, () => Array(len).fill(null));

        let row = 0;
        let directionDown = false;

        // Trace zigzag path
        for (let i = 0; i < len; i++) {
            if (row === 0 || row === rails - 1) {
                directionDown = !directionDown;
            }
            fence[row][i] = isDecode ? '*' : text[i];
            row += directionDown ? 1 : -1;
        }

        let result = '';

        if (!isDecode) {
            // Read off row by row for encryption
            for (let r = 0; r < rails; r++) {
                for (let c = 0; c < len; c++) {
                    if (fence[r][c] !== null) {
                        result += fence[r][c];
                    }
                }
            }
        } else {
            // Fill marked positions with ciphertext characters
            let idx = 0;
            for (let r = 0; r < rails; r++) {
                for (let c = 0; c < len; c++) {
                    if (fence[r][c] === '*' && idx < len) {
                        fence[r][c] = text[idx++];
                    }
                }
            }

            // Read off zigzag pattern
            row = 0;
            directionDown = false;
            for (let i = 0; i < len; i++) {
                if (row === 0 || row === rails - 1) {
                    directionDown = !directionDown;
                }
                if (fence[row][i] !== null) {
                    result += fence[row][i];
                }
                row += directionDown ? 1 : -1;
            }
        }

        return { result, fence, rails, textLength: len };
    },

    encrypt(text, rails = 3) {
        return this.process(text, rails, false);
    },

    decrypt(text, rails = 3) {
        return this.process(text, rails, true);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RailFenceCipher;
}
