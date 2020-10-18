import { init, Options } from '../index';

describe('init widget', () => {
    it('should render widget', () => {
        const containerId = 'containerId';
        const initOptions: Options = { size: 's', lang: 'en' };
        const expected = `<div class="wrapper size_${initOptions.size}"><h3 class="title">Where does it come from? Why do we use it?</h3><div class="form-wrapper"><p class="subtitle">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p> <form class="form" action="#"> <input class="input datepicker-from flatpickr-input" type="text" placeholder="Depart date" required="" readonly="readonly"> <input class="input datepicker-to flatpickr-input" type="text" placeholder="Return date" required="" readonly="readonly"><button class="button" type="submit">Search</button></form></div></div>`;

        document.body.innerHTML = `<div id=${containerId}></div>`;

        init(containerId, initOptions);

        expect(document.getElementById(containerId).innerHTML.replace(/\s/g, '')).toEqual(expected.replace(/\s/g, ''));
    });

    it('should throw error if parameter "containerId" is not passed', () => {
        expect(() => {
            // @ts-ignore
            init();
        }).toThrowError('containerId required');
    });

    it('should throw error if container is not exist', () => {
        expect(() => {
            init('fooContainerId');
        }).toThrowError('check containerId');
    });

    it('should display warning if widget initialized before', () => {
        console.warn = jest.fn();
        const containerId = 'containerId';

        document.body.innerHTML = `<div id=${containerId}></div>`;

        init(containerId);
        init(containerId);

        expect(console.warn).toHaveBeenCalledWith(`widget with id "${containerId}" already initialized`);
    });
});
