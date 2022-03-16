const wordlist = require('wordlist-english');
const fs = require('fs');

const englishWords = wordlist['english'];

const WORD_LENGTH = 5;
const AVAILABLE_LETTERS = ['x', 'a', 'e', 'w', 't', 's', 'm'];
let tempAvailableLetters = [...AVAILABLE_LETTERS];

const correctLengthWords = WORD_LENGTH ? englishWords.filter((word) => word.length === WORD_LENGTH) : englishWords.filter((word) => word.length > 1);
const validWords = correctLengthWords.filter((word) => word.split('').every((char) => AVAILABLE_LETTERS.includes(char)));

const findWords = () => {
    console.log(`> Letters available: ${AVAILABLE_LETTERS.sort().join(', ')}`);
    console.log(`> Word length: ${WORD_LENGTH}`);
    const foundWords = [];
    for (const word of validWords) {
        tempAvailableLetters = [...AVAILABLE_LETTERS];
        for (let i = 0; i < word.length; i += 1) {
            const char = word[i];
            if (tempAvailableLetters.includes(char)) {
                if (i === word.length-1) {
                    foundWords.push(word);
                    break;
                }
                tempAvailableLetters.splice(tempAvailableLetters.indexOf(char), 1);
            } else {
                tempAvailableLetters = [...AVAILABLE_LETTERS];
                break;
            }
        }
    }
    console.log(`> Words found:\n  -- ${foundWords.sort().join('\n  -- ')}`);
    return foundWords;
};

const words = findWords();
fs.writeFileSync('./wordlist.txt', words.join('\n'));