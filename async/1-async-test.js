'use strict';

console.log('Start');

console.log('Wait for it... ');

// Warum läuft der Aufruf von 'Hallo Welt' immer noch am Ende, selbst wenn wir den Timer auf 0 setzen?
setTimeout(() => {
    console.log('Hallo Welt!');
}, 0);

console.log('Anfang der Schleife');
for (let i = 0; i <= 2_000_000_000; i++) { // 2 Milliarden Schleifchen!!
    if (i === 2_000_000_000) {
        console.log('Ende der Schleife erreicht');
    }
}

console.log('Ende des Programmcodes');