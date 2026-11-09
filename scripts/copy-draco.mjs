import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'node_modules/three/examples/jsm/libs/draco/gltf');
const dest = resolve(root, 'public/draco');

if (existsSync(src)) {
	mkdirSync(dest, { recursive: true });
	for (const file of ['draco_decoder.js', 'draco_decoder.wasm', 'draco_wasm_wrapper.js']) {
		cpSync(resolve(src, file), resolve(dest, file));
	}
	console.log('Copied Draco decoder files to public/draco/');
}
