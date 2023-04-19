import { writeFileSync } from 'node:fs';
import path from 'node:path';

const DATA_FILE = path.resolve('data', 'addresses.json');

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
        if (addresses.length < 1) {
            address.id = 1;
        } else {
            address.id = Math.max(...addresses.map((adr) => adr.id)) + 1;
        }
        addresses.push(address);
    }

    writeFileSync(DATA_FILE, JSON.stringify(addresses), 'utf-8');

    return addresses;
}