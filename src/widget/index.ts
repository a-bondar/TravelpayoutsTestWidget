import styles from './styles.css';
import { i18n, Lang } from './i18n';
import { container } from 'webpack';

type Size = 'xl' | 'l' | 'm' | 's';

type Options = {
    lang?: Lang;
    textColor?: string;
    backgroundColor?: string;
    buttonColor?: string;
};

const getDefaultOptions = (window: Window): Options => ({
    lang: (window.navigator.language as Lang) ?? 'EN',
});

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

const getMarkup = (size: Size, lang: Lang = 'EN', widgetClassname: string) => {
    return `
            <div class='${styles.wrapper} ${styles[`size_${size}`]} ${widgetClassname}'>
                <h3 class=${styles.title}>${i18n[lang].title}</h3>
                   <div class=${styles['form-wrapper']}>
                        <p class=${styles.subtitle}>${i18n[lang].subtitle}</p>
                        <form class=${styles.form} action="#">
                            <input
                                class=${styles.input}
                                type="text"
                                placeholder=${i18n[lang].inputsPlaceholder.from}
                                required
                            >
                            <input 
                                class=${styles.input} 
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

const setWidgetStyle = (widget: HTMLElement, styleOptions: Omit<Options, 'lang'>) => {
    Object.keys(styleOptions).forEach((property) => {
        const value = styleOptions[property];

        widget.style.setProperty(`--${property}`, value);
    });
};

const render = (container: HTMLElement, { lang, ...restOptions }: Options) => {
    const containerSize = getContainerSize(container);
    const widgetClassname = `tp-widget-${Date.now()}`;

    container.innerHTML = getMarkup(containerSize, lang, widgetClassname);

    if (Object.keys(restOptions).length !== 0) {
        const widgetColl = container.getElementsByClassName(widgetClassname) as HTMLCollectionOf<HTMLElement>;

        if (widgetColl.length && widgetColl[0]) {
            setWidgetStyle(widgetColl[0], restOptions);
        }
    }
};

const initializedWidgetIds: Array<string> = [];

export const app = (containerId: string, options: Options = {}) => {
    if (!containerId) {
        throw new Error('containerId required');
    }

    if (initializedWidgetIds.includes(containerId)) {
        console.warn(`widget with id "${containerId}" already initialized`);

        return;
    }

    const container = document.getElementById(containerId);

    if (!container) {
        throw new Error('check containerId');
    }

    initializedWidgetIds.push(containerId);

    render(container, { ...getDefaultOptions(window), ...options });
};
