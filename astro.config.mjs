// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
	i18n: {
		locales: ['en', 'id'],
		defaultLocale: 'en',
		routing: {
			prefixDefaultLocale: false,
		},
	},
});

