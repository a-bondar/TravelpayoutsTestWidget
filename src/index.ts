import { init, Options } from './widget';

declare global {
    interface Window {
        tpGlobalWidgetInitName: string;
        queue: Array<[string, Options?]>;
    }
}

const run = () => {
    const globalWidgetName = window.tpGlobalWidgetInitName;

    if (window[globalWidgetName as any]) {
        const { queue } = window[globalWidgetName as any];

        if (queue && queue.length) {
            queue.forEach((initArgs) => init(...initArgs));
        }

        // @ts-ignore
        window[globalWidgetName] = init;
    }
};

const app = () => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
};

app();
