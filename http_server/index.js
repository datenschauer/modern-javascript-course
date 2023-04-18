import { parse } from 'querystring';
import { createServer } from 'http';
import data from './data.js';
import { getList } from './list.js';
import { deleteAddress } from './delete.js';
import { getForm } from './form.js';
import { saveAddress } from './save.js';

const server = createServer((req, res) => {
    // wir parsen die aufgerufene URL und teilen sie in die Bestandteile auf
    const parts = req.url.split('/');

    if (parts[1] === 'delete') {
        data.addresses = deleteAddress(data.addresses, parts[2]);
        redirect(res, '/');
    } else if (parts[1] === 'new') {
        send(res, getForm());
    } else if (parts[1] === 'edit') {
        send(res, getForm(data.addresses, parts[2]));
    } else if (parts[1] === 'save' && req.method === 'POST') {
        let body = '';
        // der body des Request Objekts liegt als Stream in ein oder mehreren Chunks vor
        // sobald ein Chunk vorbei ist, wird ein 'readable' event ausgelöst
        // so dann können wir den Chunk einlesen und an unsere Variable body anhängen
        req.on('readable', () => {
            const data = req.read();
            body += data !== null ? data : '';
        });
        // sobald der letzte Chunk fertig ist, wird ein 'end' event ausgelöst
        // nun können wir den stream parsen
        req.on('end', () => {
            // so sieht der Stream vorher als querystring aus
            console.log(body);
            const address = parse(body);
            // und so in geparstem Zustand
            console.log(address);
            data.addresses = saveAddress(data.addresses, address);
            redirect(res, '/');
        })
    } else {
        send(res, getList(data.addresses));
    }
});

server.listen(8888, () => {
    console.log('Adressbuch erreichbar unter http://localhost:8888');
})

// Um Code Duplikate zu vermeiden, erstellen wir eine Funktion send()
function send(res, body) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(body);
}

function redirect(res, to) {
    res.writeHead(302, {
        location: to,
        'content-type': 'text/plain'
    });
    res.end(`302 Redirecting to ${to}`);
}
