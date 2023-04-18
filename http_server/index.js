import { createServer } from 'http';

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
// wir erstellen einen Server, dem eine Funktion mit zwei Objekten für Request u. Response übergeben wird
const server = createServer((req, res) => {
    // bei eingehendem Request setzen wir den Header auf Code 200 und teilen die Art des Dokuments mit,
    // das wir bereitstellen
    res.writeHead(200, {'content-type': 'text/html'});

    // der .end Methode können wir unsere HTML Seite mitgeben
    res.end(body);
});

// zuletzt subskribieren wir ein Event, das den Server nach eingehenden Verbindungen auf Port 8888 horchen lässt
server.listen(8888, () => {
    console.log('Adressbuch erreichbar unter http://localhost:8888');
})