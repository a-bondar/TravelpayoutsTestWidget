import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';

import 'flatpickr/dist/flatpickr.min.css';

import { Lang } from './i18n';

export default (targetElement: HTMLElement, lang?: Lang) => {
    const options = lang && lang === 'ru' ? { locale: Russian } : {};

    flatpickr(targetElement, options);
};
