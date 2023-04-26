'use strict';
// wir verwenden nun die Promise API der fs Bibliothek
import fs from 'fs/promises';

const copy = async function (source, target) {
    try {
        const data = await fs.readFile(source, { encoding: 'utf8' });
        await fs.writeFile(target, data, { encoding: 'utf8' });
    } catch (ex) {
        throw ex; // eigentlich überflüssig (verdeutlicht nur die Verwendung von try-catch)!
    }
};

try {
    await copy('input.txt', 'output.txt');
    console.log('Datei kopiert!');
} catch (ex) {
    console.log(ex);
}