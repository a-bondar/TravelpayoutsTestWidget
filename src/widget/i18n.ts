type TextContent = {
    title: string;
    subtitle: string;
    button: string;
    inputsPlaceholder: {
        from: string;
        to: string;
    };
};

export type Lang = 'EN' | 'RU';

type i18n = {
    EN: TextContent;
    RU: TextContent;
};

export const i18n: i18n = {
    EN: {
        title: 'Where does it come from? Why do we use it?',
        subtitle:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        button: 'Search',
        inputsPlaceholder: {
            from: '"Depart date"',
            to: '"Return date"',
        },
    },
    RU: {
        title: 'Откуда он взялся? Почему мы его используем?',
        subtitle:
            'Давно установлено, что читатель будет отвлекаться на читабельное содержимое страницы при просмотре ее макета.',
        button: 'Поиск',
        inputsPlaceholder: {
            from: '"Дата отправления"',
            to: '"Дата возвращения"',
        },
    },
};
