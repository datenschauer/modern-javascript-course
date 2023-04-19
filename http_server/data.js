import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

export default {
    addresses: [
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
        },
        {
            id: 3,
            firstname: "Angela",
            lastname: "Merkel",
            street: "Kanzlerstr. 66",
            city: "Hauptstadt",
        }
    ],
};

const DATA_FILE = path.resolve('data', 'addresses.json');

export function getData() {
    let addresses = [];

    try {
        const data = readFileSync(DATA_FILE, 'utf-8');
        addresses = JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            writeFileSync(DATA_FILE, '[]');
        } else {
            throw err;
        }
    }

    return addresses;
}