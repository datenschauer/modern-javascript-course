'use strict';

console.log('Start');

console.log('Wait for it... ');

// Warum läuft der Aufruf von 'Hallo Welt' immer noch am Ende, selbst wenn wir den Timer auf 0 setzen?
setTimeout(() => {
    console.log('Hallo Welt!');
}, 0);

console.log('Ende');