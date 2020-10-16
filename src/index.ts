import { init } from './widget';

declare global {
    interface Window {
        tpGlobalWidgetInitName: string;
    }
}

const run = () => {
    const globalWidgetName = window.tpGlobalWidgetInitName;

    // @ts-ignore
    const { queue } = window[globalWidgetName];

    if (queue && queue.length) {
        queue.forEach((initArgs: Array<any>) => init(initArgs[0], initArgs[1]));
    }

    // @ts-ignore
    window[globalWidgetName] = init;
};

const app = () => {
    debugger;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
};

app();
