'use strict';

import fs from 'fs';

const readInput = function (fileName, callback) {
    fs.readFile(fileName, { encoding: 'utf8' }, (err, data) => {
        // Achtung! return data funktioniert nicht!
        // ein Callback ist daher zwingend nötig, der Fehler oder Daten entgegennimmt!
        if (err) {
            return callback(err);
        }
        // typischerweise werden in der javascript Welt die Signaturen asynchroner
        // callbacks immer so gestrickt, dass zuerst der Fehler übergeben wird und
        // dann die Daten
        callback(null, data);
    });
};

const writeOutput = function (fileName, data, callback) {
    fs.writeFile(fileName, data, { encoding: 'utf8' }, err => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

const copy = function (source, target, callback) {
    readInput(source, (err, data) => {
        // wenn etwas schief gegangen ist, rufen wir den eigentlichen callback mit dem Fehler auf
        if (err) {
            return callback(err);
        }
        // wenn alles gut geht, können wir die empfangenen Daten an die writeOutput Funktion übergeben
        // wichtig ist hier die Verschachtelung, weil "data" ja nur innerhalb von
        // readInput() existiert!
        writeOutput(target, data, err => {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    });
};

// wir testen das Ganze!
copy('input.txt', 'output.txt', err => {
    if (err) {
        return console.log('Es gab einen Fehler!');
    }
    console.log('Datei kopiert!');
});