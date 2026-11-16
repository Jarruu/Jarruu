import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ui } from '../src/i18n/ui.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function parseFrontmatter(raw) {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	assert.ok(match, 'Markdown file must start with YAML frontmatter');
	const fields = {};
	for (const line of match[1].split(/\r?\n/)) {
		const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
		if (kv) fields[kv[1]] = kv[2].trim();
	}
	return fields;
}

test('ui translations have identical en and id keys with non-empty values', () => {
	const enKeys = Object.keys(ui.en).sort();
	const idKeys = Object.keys(ui.id).sort();
	assert.deepEqual(enKeys, idKeys);

	for (const key of enKeys) {
		assert.ok(ui.en[key].trim().length > 0, `Empty en translation for ${key}`);
		assert.ok(ui.id[key].trim().length > 0, `Empty id translation for ${key}`);
	}
});

test('works markdown entries have matching en/id slugIds, valid covers, and no removed flags', () => {
	const worksDir = resolve(root, 'src/content/works');
	const slugsByLang = { en: new Map(), id: new Map() };

	for (const lang of ['en', 'id']) {
		const dir = resolve(worksDir, lang);
		const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
		assert.ok(files.length > 0, `Expected markdown files in works/${lang}`);

		for (const file of files) {
			const filePath = resolve(dir, file);
			const fm = parseFrontmatter(readFileSync(filePath, 'utf8'));

			assert.equal(fm.lang, lang, `${file} lang mismatch`);
			assert.ok(fm.slugId, `${file} missing slugId`);
			assert.ok(!('featured' in fm), `${file} still contains removed 'featured' field`);
			assert.ok(!('placeholder' in fm), `${file} still contains removed 'placeholder' field`);
			assert.ok(!slugsByLang[lang].has(fm.slugId), `Duplicate slugId ${fm.slugId} in ${lang}`);

			const coverPath = resolve(dirname(filePath), fm.cover);
			assert.ok(existsSync(coverPath), `${file} cover not found at ${fm.cover}`);

			slugsByLang[lang].set(fm.slugId, fm.order);
		}
	}

	assert.deepEqual([...slugsByLang.en.keys()].sort(), [...slugsByLang.id.keys()].sort());
});

test('every skill in profile.ts has a valid explicit icon mapping in skill-icons.ts', () => {
	const profileSrc = readFileSync(resolve(root, 'src/data/profile.ts'), 'utf8');
	const iconsSrc = readFileSync(resolve(root, 'src/data/skill-icons.ts'), 'utf8');
	const devicon = JSON.parse(
		readFileSync(resolve(root, 'node_modules/@iconify-json/devicon/icons.json'), 'utf8'),
	);

	const itemsBlocks = [...profileSrc.matchAll(/items:\s*\[([\s\S]*?)\]/g)];
	assert.ok(itemsBlocks.length > 0, 'Could not locate skillGroups items in profile.ts');

	const skills = itemsBlocks.flatMap((m) =>
		[...m[1].matchAll(/'([^']+)'/g)].map((entry) => entry[1]),
	);

	const mapMatch = iconsSrc.match(/const SKILL_LOGO_MAP[^=]*=\s*\{([\s\S]*?)\n\};/);
	assert.ok(mapMatch, 'Could not locate SKILL_LOGO_MAP in skill-icons.ts');

	const mappedKeys = new Set(
		[...mapMatch[1].matchAll(/^\s*(?:'([^']+)'|([A-Za-z0-9_]+)):/gm)].map(
			(m) => m[1] || m[2],
		),
	);

	for (const skill of skills) {
		assert.ok(mappedKeys.has(skill), `Skill "${skill}" is missing from SKILL_LOGO_MAP`);
	}

	for (const match of iconsSrc.matchAll(/fromDevicon\(\s*'([^']+)'/g)) {
		const iconKey = match[1];
		assert.ok(devicon.icons[iconKey], `Missing devicon icon "${iconKey}"`);
	}
});
