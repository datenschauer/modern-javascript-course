export function saveAddress (addresses, address) {
    // ist ein Eintrag schon vorhanden, wird er editiert
    if (address.id) {
        const intId = parseInt(address.id, 10) // alles aus dem request objekt ist ein string!
        const index = addresses.findIndex((adr) => {
            return adr.id === intId;
        });
        address.id = intId; // es wird ja int im array erwartet
        addresses[index] = address;
    } else { // ist noch kein Eintrag vorhanden, wird er neu angelegt
        // zuerst suchen wir den Eintrag mit der höchsten ID und addieren 1 dazu
        address.id = Math.max(...addresses.map((adr) => adr.id)) + 1;
        addresses.push(address);
    }
    return addresses;
}