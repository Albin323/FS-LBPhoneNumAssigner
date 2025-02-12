import { LocaleKeys } from '../locales';

let locales: Record<string, string> = {};
let selectedLanguage = 'en';

// Load language from config.json
function loadLocales() {
    const config = JSON.parse(LoadResourceFile(GetCurrentResourceName(), 'config.json') || '{}');
    selectedLanguage = config.language || 'en';

    // Load selected language
    const filePath = `locales/${selectedLanguage}.json`;
    const fileContent = LoadResourceFile(GetCurrentResourceName(), filePath);

    if (fileContent) {
        locales = JSON.parse(fileContent);
    } else {
        console.error(`[Locale] '${selectedLanguage}.json' not found! Falling back to English.`);
        locales = {};
    }

    // Load English as a fallback for missing keys
    const enFileContent = LoadResourceFile(GetCurrentResourceName(), 'locales/en.json');
    if (enFileContent) {
        const enLocales = JSON.parse(enFileContent);
        locales = { ...enLocales, ...locales }; // Merge English as fallback
    }
}

export function locale(key: LocaleKeys): string {
    return locales[key] || key;
}

loadLocales();