'use strict';

import fs from 'fs';
import { promisify } from 'util';

const readInput = promisify(fs.readFile);
const writeOutput = promisify(fs.writeFile);
// dies ersetzt das händische Anlegen Promise basierter Funktionen!

// const readInput = function (fileName) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(fileName, { encoding: 'utf8'}, (err, data) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(data);
//         })
//     });
// };
//
// const writeOutput = function (fileName, data) {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(fileName, data, { encoding: 'utf8' }, err => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve();
//         })
//     })
// };

// mit async await sieht das ganze verdammt einfach und lesbar aus!
const copy = async function (source, target) {
    try {
        const data = await readInput(source);
        await writeOutput(target, data);
    } catch (ex) {
        throw ex; // eigentlich überflüssig (verdeutlicht nur die Verwendung von try-catch)!
    }
};

// das Ganze können wir jetzt auch in einem Try-Catch-Block testen
// Achtung! Dieser Code funktioniert erst seit ES2022 seit es ein Top-Level await gibt!
try {
    await copy('input.txt', 'output.txt');
    console.log('Datei kopiert!');
} catch (ex) {
    console.log(ex);
}

// vorher musste man den Code in eine asynchroner immediately-invoked-function-expression (IIFE)
// stecken:
// (async () => {
//     try {
//         await copy('input.txt', 'output.txt');
//         console.log('Datei kopiert!');
//     } catch (ex) {
//         console.log(ex);
//     }
// })();