import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import defaultLang from './vi';
import enLang from './en';
import arLang from './ar';
import cnLang from './cn';
import esLang from './es';
import frLang from './fr';
import jaLang from './ja';
import kmLang from './km';
import koLang from './ko';
import loLang from './lo';
import msLang from './ms';
import paLang from './pa';
import ptLang from './pt';
import ruLang from './ru';
import thLang from './th'; 
import { storage } from 'src/helpers/storage';
import { LANGUAGE_DEFAULT, AVAILABLE_LANGUAGES } from 'src/helpers/constants';
import moment from 'moment';
import 'moment/locale/id';

moment.defineLocale('e', {
    parentLocale: 'vi',
    /* */
});

export type LangDataTypes = Partial<typeof defaultLang>;

i18n.use({
    type: 'languageDetector',
    async: true,
    detect: async (cb: (val: string | null) => void) => {
        const [{ languageCode }] = getLocales();
        let lang = LANGUAGE_DEFAULT;
        if (AVAILABLE_LANGUAGES.includes(languageCode)) {
            lang = languageCode;
        }
        try {
            const cacheLanguage = await storage.get('language');
            if (cacheLanguage) {
                moment.locale([cacheLanguage, lang]);
            } else {
                moment.locale(lang);
            }
            cb(cacheLanguage ? cacheLanguage : lang);
        } catch {
            moment.locale(lang);
            cb(lang);
        }
        return languageCode
    },
    init: Function.prototype,
    cacheUserLanguage: Function.prototype,
})
    .use(initReactI18next)
    .init({
        defaultNS: 'translation',
        fallbackLng: LANGUAGE_DEFAULT,
        debug: false,
        interpolation: {
            escapeValue: true,
        },
        keySeparator: false,
        resources: {
            vi: defaultLang,
            en: enLang,
            ar:arLang,
            cn:cnLang,
            es:esLang,
            fr:frLang,
            ja:jaLang,
            km:kmLang,
            ko:koLang,
            lo:loLang,
            ms:msLang,
            pa:paLang,
            pt:ptLang,
            ru:ruLang,
            th:thLang
        },
    });

export { i18n };
