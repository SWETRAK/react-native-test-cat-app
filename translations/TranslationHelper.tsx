import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import enI18n from "./en";
import plI18n from "./pl";

const i18n = new I18n({
    en: enI18n,
    pl: plI18n
});

i18n.defaultLocale = "en";
i18n.enableFallback = true;
i18n.locale = getLocales()[0].languageCode ?? i18n.defaultLocale;

export default i18n;