import styles from './styles.css';
import { i18n, Lang } from './i18n';

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

const getMarkup = (size: Size, lang: Lang = 'EN') => {
    return `
            <div class='${styles.wrapper} ${styles[`size_${size}`]}'>
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

const render = (container: HTMLElement, { lang, ...restOptions }: Options) => {
    const containerSize = getContainerSize(container);

    container.innerHTML = getMarkup(containerSize, lang);
};

export const app = (containerId: string, options: Options = {}) => {
    // TODO - добавить обработку ошибок
    const mergedOptions = { ...getDefaultOptions(window), ...options };
    const container = document.getElementById(containerId);

    render(container, mergedOptions);
};
