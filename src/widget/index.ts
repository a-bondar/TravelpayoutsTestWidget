import styles from './styles.css';
import { i18n, Lang } from './i18n';

type Size = 'xl' | 'l' | 'm' | 's'

const getMarkup = (size: Size, lang: Lang = 'EN') => (
    `
        <div class='${styles.wrapper} ${styles[`size_${size}`]}'>
            <h3 class=${styles.title}>${i18n[lang].title}</h3>
               <div class=${styles['form-wrapper']}>
                    <p class=${styles.subtitle}>${i18n[lang].subtitle}</p>
                    <form class=${styles.form} action="#">
                        <input class=${styles.input} type="text" placeholder=${i18n[lang].inputsPlaceholder.from} required>
                        <input class=${styles.input} type="text" placeholder=${i18n[lang].inputsPlaceholder.to} required>
                        <button class=${styles.button} type="submit">${i18n[lang].button}</button>
                    </form>
               </div>
        </div>
    `
)

export const app = () => {
    const widget = document.getElementById('widget');

    widget.innerHTML = getMarkup('xl');
}