/**
 * Playfair Cipher Engine & Visual Step Tracer
 */

const PlayfairCipher = {
    /**
     * Generates a 5x5 key matrix from keyword (combining I and J)
     */
    generateMatrix(key = 'MONARCHY') {
        const cleanKey = (key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I') + 'ABCDEFGHIKLMNOPQRSTUVWXYZ');
        const matrix = [];
        const used = new Set();

        for (let char of cleanKey) {
            if (!used.has(char)) {
                used.add(char);
                matrix.push(char);
            }
        }

        // Return 5x5 2D array and flattened matrix
        const grid = [];
        for (let i = 0; i < 5; i++) {
            grid.push(matrix.slice(i * 5, i * 5 + 5));
        }

        return { matrix, grid };
    },

    /**
     * Prepares plaintext into pairs of letters with filler 'X'
     */
    prepareText(text) {
        let clean = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
        if (!clean) return [];

        const pairs = [];
        let i = 0;
        while (i < clean.length) {
            let first = clean[i];
            let second = '';

            if (i + 1 < clean.length) {
                second = clean[i + 1];
                if (first === second) {
                    second = first === 'X' ? 'Z' : 'X';
                    i += 1;
                } else {
                    i += 2;
                }
            } else {
                second = first === 'X' ? 'Z' : 'X';
                i += 1;
            }
            pairs.push([first, second]);
        }
        return pairs;
    },

    findPosition(matrix, char) {
        const idx = matrix.indexOf(char);
        return { row: Math.floor(idx / 5), col: idx % 5 };
    },

    process(text, key, isDecode = false) {
        if (!text) return { result: '', steps: [], grid: [] };

        const { matrix, grid } = this.generateMatrix(key);
        
        let pairs;
        if (!isDecode) {
            pairs = this.prepareText(text);
        } else {
            // For decode, input should be paired directly (length must be even)
            const clean = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
            pairs = [];
            for (let i = 0; i < clean.length; i += 2) {
                if (i + 1 < clean.length) {
                    pairs.push([clean[i], clean[i + 1]]);
                } else {
                    pairs.push([clean[i], 'X']);
                }
            }
        }

        let result = '';
        const steps = [];
        const shift = isDecode ? -1 : 1;

        pairs.forEach(([p1, p2]) => {
            const pos1 = this.findPosition(matrix, p1);
            const pos2 = this.findPosition(matrix, p2);

            let res1, res2, rule;

            if (pos1.row === pos2.row) {
                // Same Row
                rule = 'Same Row';
                const col1 = (pos1.col + shift + 5) % 5;
                const col2 = (pos2.col + shift + 5) % 5;
                res1 = grid[pos1.row][col1];
                res2 = grid[pos2.row][col2];
            } else if (pos1.col === pos2.col) {
                // Same Column
                rule = 'Same Column';
                const row1 = (pos1.row + shift + 5) % 5;
                const row2 = (pos2.row + shift + 5) % 5;
                res1 = grid[row1][pos1.col];
                res2 = grid[row2][pos2.col];
            } else {
                // Rectangle rule
                rule = 'Rectangle';
                res1 = grid[pos1.row][pos2.col];
                res2 = grid[pos2.row][pos1.col];
            }

            result += res1 + res2;
            steps.push({
                inPair: [p1, p2],
                outPair: [res1, res2],
                pos1,
                pos2,
                rule
            });
        });

        return { result, steps, grid, matrix };
    },

    encrypt(text, key = 'MONARCHY') {
        return this.process(text, key, false);
    },

    decrypt(text, key = 'MONARCHY') {
        return this.process(text, key, true);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PlayfairCipher;
}
