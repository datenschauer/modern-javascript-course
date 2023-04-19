import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

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