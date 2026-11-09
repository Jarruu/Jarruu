import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLang, type Lang, ui } from './ui';

export function getLangFromUrl(url: URL): Lang {
	const [, firstSegment] = url.pathname.split('/');
	if (firstSegment === 'id') return 'id';
	return defaultLang;
}

export function useTranslations(lang: Lang) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}

export function localePath(lang: Lang, path = ''): string {
	const clean = path.replace(/^\/+/, '');
	return getRelativeLocaleUrl(lang, clean);
}

export function switchLocaleUrl(url: URL, targetLang: Lang): string {
	const stripped = url.pathname.replace(/^\/id(\/|$)/, '/');
	const clean = stripped.replace(/^\/+/, '');
	return getRelativeLocaleUrl(targetLang, clean);
}
