type TextContent = {
    title: string;
    subtitle: string;
    button: string;
    inputsPlaceholder: {
        from: string;
        to: string;
    };
};

type i18n = {
    en: TextContent;
    ru: TextContent;
};

export const i18n: i18n = {
    en: {
        title: 'Where does it come from? Why do we use it?',
        subtitle:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        button: 'Search',
        inputsPlaceholder: {
            from: '"Depart date"',
            to: '"Return date"',
        },
    },
    ru: {
        title: 'Откуда он взялся? Почему мы его используем?',
        subtitle:
            'Давно установлено, что читатель будет отвлекаться на читабельное содержимое страницы при просмотре ее макета.',
        button: 'Поиск',
        inputsPlaceholder: {
            from: '"Дата отправления"',
            to: '"Дата прибытия"',
        },
    },
};

export type Lang = keyof typeof i18n;
