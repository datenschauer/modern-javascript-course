import { parse } from 'querystring';
import { createServer } from 'https';
import { readFile, readFileSync } from 'fs';
import { getData } from './data.js';
import { getList } from './list.js';
import { deleteAddress } from './delete.js';
import { getForm } from './form.js';
import { saveAddress } from './save.js';

// wir müssen zuerst einen öffentlichen Schlüssel und sodann ein Zertifikat generieren mit:
// openssl genrsa -out localhost.key 2048
// openssl req -new -x509 -key localhost.key -out localhost.cert -days 9999 -subj /CN=localhost
// danach können wir die generierten Dateien hier einlesen und als Option createServer() übergeben
const options = {
    key: readFileSync('./localhost.key'),
    cert: readFileSync('./localhost.cert'),
};

// Neu: der Schlüssel und das Zertifikat müssen als Optionen übergeben werden
const server = createServer(options,(req, res) => {
    const parts = req.url.split('/');

    if (parts[1] === 'delete') {
        deleteAddress(getData(), parts[2]);
        redirect(res, '/');
    } else if (parts[1] === 'new') {
        send(res, getForm());
    } else if (parts[1] === 'edit') {
        send(res, getForm(getData(), parts[2]));
    } else if (parts[1] === 'save' && req.method === 'POST') {
        let body = '';
        req.on('readable', () => {
            const data = req.read();
            body += data !== null ? data : '';
        });
        req.on('end', () => {
            const address = parse(body);
            saveAddress(getData(), address);
            redirect(res, '/');
        })
    } else if (req.url === '/style.css') {
        readFile('public/style.css', 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end();
            } else {
                res.end(data);
            }
        });
    } else {
        send(res, getList(getData()));
    }
});

server.listen(8888, () => {
    // der Server ist nun natürlich unter https:// verfügbar
    console.log('Adressbuch erreichbar unter https://localhost:8888');
})

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
