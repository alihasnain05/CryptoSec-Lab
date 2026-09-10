/**
 * Hill Cipher Engine (2x2 Matrix) & Modular Arithmetic Validator
 */

const HillCipher = {
    gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b) {
            let t = b;
            b = a % b;
            a = t;
        }
        return a;
    },

    modInverse(a, m = 26) {
        a = ((a % m) + m) % m;
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        return null;
    },

    /**
     * Validates 2x2 Matrix key
     * matrix = [[a, b], [c, d]]
     */
    validateMatrix(matrix) {
        const a = matrix[0][0], b = matrix[0][1];
        const c = matrix[1][0], d = matrix[1][1];

        const det = ((a * d - b * c) % 26 + 26) % 26;
        const g = this.gcd(det, 26);
        const invDet = this.modInverse(det, 26);

        const isValid = g === 1 && invDet !== null;

        let invMatrix = null;
        if (isValid) {
            invMatrix = [
                [((d * invDet) % 26 + 26) % 26, ((-b * invDet) % 26 + 26) % 26],
                [((-c * invDet) % 26 + 26) % 26, ((a * invDet) % 26 + 26) % 26]
            ];
        }

        return {
            isValid,
            det,
            invDet,
            gcd: g,
            matrix,
            invMatrix,
            reason: isValid ? 'Valid key matrix' : `Determinant (${det}) is not coprime with 26 (gcd = ${g}). Matrix has no modular inverse.`
        };
    },

    process(text, matrix = [[5, 8], [17, 3]], isDecode = false) {
        if (!text) return { result: '', steps: [], validation: this.validateMatrix(matrix) };

        const validation = this.validateMatrix(matrix);
        if (!validation.isValid) {
            return {
                error: validation.reason,
                result: '',
                steps: [],
                validation
            };
        }

        const activeMatrix = isDecode ? validation.invMatrix : matrix;
        const clean = text.toUpperCase().replace(/[^A-Z]/g, '');

        if (!clean) return { result: '', steps: [], validation };

        // Pair text, pad with 'X' if odd
        const padded = clean.length % 2 === 0 ? clean : clean + 'X';
        let result = '';
        const steps = [];

        for (let i = 0; i < padded.length; i += 2) {
            const p1 = padded.charCodeAt(i) - 65;
            const p2 = padded.charCodeAt(i + 1) - 65;

            const c1 = (activeMatrix[0][0] * p1 + activeMatrix[0][1] * p2) % 26;
            const c2 = (activeMatrix[1][0] * p1 + activeMatrix[1][1] * p2) % 26;

            const r1Char = String.fromCharCode(c1 + 65);
            const r2Char = String.fromCharCode(c2 + 65);

            result += r1Char + r2Char;

            steps.push({
                pair: [padded[i], padded[i + 1]],
                pVector: [p1, p2],
                matrix: activeMatrix,
                cVector: [c1, c2],
                outPair: [r1Char, r2Char]
            });
        }

        return { result, steps, validation };
    },

    encrypt(text, matrix = [[5, 8], [17, 3]]) {
        return this.process(text, matrix, false);
    },

    decrypt(text, matrix = [[5, 8], [17, 3]]) {
        return this.process(text, matrix, true);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = HillCipher;
}
