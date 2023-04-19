import { writeFileSync } from 'node:fs';
import path from 'node:path';

const DATA_FILE = path.resolve('data', 'addresses.json');

export function deleteAddress(addresses, id) {
    const parsedId = parseInt(id, 10);
    const filteredAddresses = addresses.filter(
        (address) => address.id !== parsedId,
    );
    writeFileSync(DATA_FILE, JSON.stringify(filteredAddresses), 'utf-8');
    return filteredAddresses;
}