import { createServer } from 'http';

// wir legen uns ein paar Adressen an
const addresses = [
    {
    id: 1,
    firstname: "Stefan",
    lastname: "Böhringer",
    street: "Mainstr. 4",
    city: "Regensburg",
    },
    {
     id: 2,
     firstname: "Nils",
     lastname: "Hellwig",
     street: "Donauweg 12",
     city: "Regensburg",
    }
]

// unsere html Seite, die vom Server zurückgegeben wird
const body = `
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>Adressbuch</title>
</head>
<body>
<h1>Mein Adressbuch</h1>
<table>
<thead>
    <tr>
    <th>Vorname</th>
    <th>Nachname</th>
    <th>Strasse</th>
    <th>Stadt</th>
    </tr>
</thead>
<tbody>
    ${addresses.map(createRow).join('')}
</tbody>
</table>
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

// erzeugt eine Reihe unseres Adressbuchs
function createRow(address) {
    return `<tr>
        <td>${address.firstname}</td>
        <td>${address.lastname}</td>
        <td>${address.street}</td>
        <td>${address.city}</td>
        </tr>
        `;
}