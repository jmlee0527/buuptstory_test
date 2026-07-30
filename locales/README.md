# Mimi Test translations

- `ko.json` is the source dictionary. Do not rewrite existing Korean product content through translation.
- `en.json`, `ja.json`, and `zh.json` must contain the same keys as `ko.json`.
- Shared interface copy belongs in these dictionaries.
- Test-specific titles, descriptions, questions, and options belong in `lib/test-i18n.ts`, keyed by test slug.
- Use a test translation's `content` map for custom result names, explanations, and other strings that live outside `TestDefinition`.
- A missing test translation intentionally falls back to the original Korean value.
- Run `npm run validate:i18n` after adding or changing translation keys.

## Full content catalogs

Strings rendered by dedicated result components and heterogeneous question banks
are stored in `content-ko.json` and the language-specific `content-en.json`,
`content-ja.json`, and `content-zh.json` catalogs.

After adding a test or changing visible copy, refresh them in this order:

```bash
npm run i18n:extract
npm run i18n:translate:en
npm run i18n:translate:ja
npm run i18n:translate:zh
npm run validate:i18n
```

Translation generation uses a local model only during development. Production
browsers load the selected static JSON catalog and never call a translation API
or ship the translation model.
