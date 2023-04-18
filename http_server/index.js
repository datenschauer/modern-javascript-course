import { createServer } from 'http';
import data from './data.js';
import { getList } from './list.js';
import { deleteAddress } from './delete.js';
import { getForm } from './form.js';

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
