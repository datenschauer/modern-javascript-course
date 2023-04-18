import { Server } from 'http';

// unsere html Seite, die vom Server zurückgegeben wird
const body = `
<!DOCTYPE html>
<html>
<head><title>Adressbuch</title></head>
<body>
<h1>Mein Adressbuch</h1>
</body>
</html>
`

const server = new Server();

// ein Request ist eingentlich ein Event auf das man sich subskribieren kann
server.on('request', (req, res) => {
    res.statusCode = 200;
    res.setHeader('content-type', 'text/html');
    // wir können so viele chunks per write Methode in einem Response übergeben
    res.write(body);
    // wir müssen aber das Ende des Response mitteilen, ansonsten gibt es einen Timeout
    res.end();
    // nun ist der Response vorbei und kann nicht mehr initialisiert werden
    // erst ein erneuter Request ermöglicht einen Response!!
});

// auch das Listening ist ein Event
server.on('listening', () => {
    console.log('Adressbuch erreichbar unter http://localhost:8888');
});

server.listen(8888);