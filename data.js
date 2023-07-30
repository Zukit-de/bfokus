var data = [
    {
        component: 'heading', // text, link, toggle, button
        params: {
            text: 'Below are the results for <mark>"kaffeemaschinen"</mark>. Price range <mark>80-200 euros</mark> and 4 stars or more for the first 10 products.',
            ariaLabel: 'Below are the results for "kaffeemaschinen". Price range 80-200 euros and 4 stars or more for the first 10 products.',
            level: 5, // 1 - 6
        },
    },
    {
        component: 'text', // text, link, toggle, button
        params: {
            text: '1. BLACK+DECKER 12-Cup* Programmable Coffeemaker, Black, CM1070B-1',
        },
    },
    {
        component: 'link', // text, link, toggle, button
        params: {
            text: '2. Simple Link',
            href: '#',
        },
    },
    {
        component: 'toggle', // text, link, toggle, button
        text: '3. Toggle',
        data: [
            {
                component: 'text', // text, link, toggle, button
                params: {
                    text: '3.1. Simple Text',
                },
            },
            {
                component: 'link', // text, link, toggle, button
                params: {
                    text: '3.2. Simple Link',
                    hreft: '#',
                },
            },
            {
                component: 'button', // text, link, toggle, button
                params: {
                    text: '3.3. Button Secondary',
                    style: 'outline-secondary',
                },
            },
        ],
    },
    {
        component: 'button', // text, link, toggle, button
        params: {
            text: '4. Button',
        },
    },
    {
        component: 'button', // text, link, toggle, button
        params: {
            text: '5. Button Secondary',
            style: 'outline-secondary',
        },
    },
];