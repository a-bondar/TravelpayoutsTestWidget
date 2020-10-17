import initDatePicker from './datepicker';
import { i18n, Lang } from './i18n';

import styles from './styles.module.css';

type Size = 'xl' | 'l' | 'm' | 's';

export type Options = {
    lang?: Lang;
    textColor?: string;
    backgroundColor?: string;
    buttonColor?: string;
    size?: Size;
};

const getDefaultOptions = (window: Window): Options => {
    let lang = 'ru' as Lang;

    if (window.navigator.language) {
        const userLang = window.navigator.language.split('-')[0] as Lang;
        const hasTranslate = i18n[userLang];

        if (hasTranslate) {
            lang = userLang;
        }
    }

    return {
        lang,
    };
};

const getContainerSize = (container: HTMLElement): Size => {
    const width = container.offsetWidth;

    if (width < 440) {
        return 's';
    }

    if (width < 768) {
        return 'm';
    }

    if (width < 1024) {
        return 'l';
    }

    return 'xl';
};

const getMarkup = (size: Size, lang: Lang = 'en', widgetClassname: string) => {
    return `
            <div class='${styles.wrapper} ${styles[`size_${size}`]} ${widgetClassname}'>
                <h3 class=${styles.title}>${i18n[lang].title}</h3>
                   <div class=${styles['form-wrapper']}>
                        <p class=${styles.subtitle}>${i18n[lang].subtitle}</p>
                        <form class=${styles.form} action="#">
                            <input
                                class='${styles.input} datepicker-from'
                                type="text"
                                placeholder=${i18n[lang].inputsPlaceholder.from}
                                required
                            >
                            <input
                                class='${styles.input} datepicker-to'
                                type="text" 
                                placeholder=${i18n[lang].inputsPlaceholder.to} 
                                required
                            >
                            <button 
                                class=${styles.button} 
                                type="submit"
                            >${i18n[lang].button}
                            </button>
                        </form>
                   </div>
            </div>
        `;
};

const setWidgetStyle = (widget: HTMLElement, styleOptions: Omit<Options, 'lang' | 'size'>) => {
    Object.keys(styleOptions).forEach((property: keyof typeof styleOptions) => {
        const value = styleOptions[property];

        widget.style.setProperty(`--${property}`, value);
    });
};

const renderDatePicker = (container: HTMLElement, lang?: Lang) => {
    const inputFrom = container.querySelector('.datepicker-from') as HTMLElement;
    const inputTo = container.querySelector('.datepicker-to') as HTMLElement;

    if (inputFrom && inputTo) {
        initDatePicker(inputFrom, lang);
        initDatePicker(inputTo, lang);
    }
};

const render = (container: HTMLElement, { lang, size, ...restOptions }: Options) => {
    const containerSize = size || getContainerSize(container);
    const widgetClassname = `tp-widget-${Date.now()}`;

    container.innerHTML = getMarkup(containerSize, lang, widgetClassname);

    if (Object.keys(restOptions).length !== 0) {
        const widgetColl = container.getElementsByClassName(widgetClassname) as HTMLCollectionOf<HTMLElement>;

        if (widgetColl.length && widgetColl[0]) {
            setWidgetStyle(widgetColl[0], restOptions);
        }
    }
};

const checkBeforeInit = (containerId: string, initializedWidgetIds: Array<string>) => {
    if (!containerId) {
        throw new Error('containerId required');
    }

    if (!document.getElementById(containerId)) {
        throw new Error('check containerId');
    }

    if (initializedWidgetIds.includes(containerId)) {
        console.warn(`widget with id "${containerId}" already initialized`);

        return false;
    }

    return true;
};

const initializedWidgetIds: Array<string> = [];

export const init = (containerId: string, options: Options = {}) => {
    const isCheckSuccess = checkBeforeInit(containerId, initializedWidgetIds);

    if (!isCheckSuccess) {
        return;
    }

    const container = document.getElementById(containerId);
    const mergedOptions = { ...getDefaultOptions(window), ...options };

    render(container, mergedOptions);
    renderDatePicker(container, mergedOptions.lang);

    initializedWidgetIds.push(containerId);
};
