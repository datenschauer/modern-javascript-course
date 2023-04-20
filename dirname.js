"use strict";

// hiermit emulieren wir ein Verhalten aus CommonJS Modulen und stellen eine Variable __dirname bereit
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export { __dirname }