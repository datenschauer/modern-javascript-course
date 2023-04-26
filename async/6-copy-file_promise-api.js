'use strict';
// wir verwenden nun die Promise API der fs Bibliothek
import fs from 'fs/promises';

const copy = async function (source, target) {
    const data = await fs.readFile(source, { encoding: 'utf8' });
    await fs.writeFile(target, data, { encoding: 'utf8' });
};

try {
    await copy('input3.txt', 'output.txt');
    console.log('Datei kopiert!');
} catch (ex) {
    console.log(ex);
}