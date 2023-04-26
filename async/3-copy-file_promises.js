'use strict';

import fs from 'fs';

const readInput = function (fileName) {
    // wir geben ein Promise zurück, dass mit einem Callback aufgerufen wird
    // hier ist zwar immer noch ein Callback involviert, aber der weitere Code
    // sollte deutlich einfacher werden (?)
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, { encoding: 'utf8'}, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        })
    });
};

const writeOutput = function (fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, { encoding: 'utf8' }, err => {
            if (err) {
                return reject(err);
            }
            resolve();
        })
    })
};

const copy = function (source, target) {
    // auch diese Funktion muss asynchron sein, also ein Promise zurückgeben:
    return new Promise((resolve, reject) => {
        // Wir wissen nun, dass unsere Funktionen readInput und writeOutput Promises zurückgeben.
        // Jedes Promise Objekt hat eine Methode .then() und eine Methode .catch(), die wir verwenden
        // können, um zu sagen: wenn etwas zurückgegeben wird DANN mache X, ANDERENFALLS mache Y.
        readInput(source)
            // leider nehmen then() und catch() wieder callbacks entgegen :-/
            .then(data => {
                // hier geben wir direkt das Promise aus writeOutput zurück, damit
                // wir gleich im nächsten Schritt wieder .then() aufrufen können
                return writeOutput(target, data);
            })
            .then(() => {
                resolve();
            })
            // alle Fehler werden durchgereicht und mit .catch() abgefangen.
            .catch(err => {
                reject(err);
            });
    });
};

// wir testen das Ganze!
copy('input.txt', 'output.txt')
    .then( () => console.log('Datei kopiert!') )
    .catch( err => console.log(err) );