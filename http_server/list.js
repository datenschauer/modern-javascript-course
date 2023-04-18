export function getList(addresses) {
    return `
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
    <th><em>löschen</em></th>
    </tr>
</thead>
<tbody>
    ${addresses.map(createRow).join('')}
</tbody>
</table>
</body>
</html>
`
}

// erzeugt eine Reihe unseres Adressbuchs
function createRow(address) {
    return `<tr>
        <td>${address.firstname}</td>
        <td>${address.lastname}</td>
        <td>${address.street}</td>
        <td>${address.city}</td>
        <td><a href="/delete/${address.id}">löschen</a></td>
        </tr>
        `;
}
