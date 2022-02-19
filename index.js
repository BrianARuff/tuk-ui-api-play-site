(async () => {
    document.addEventListener('DOMContentLoaded', async (e) => {
        const getAddons = async () => await axios.get('https://www.tukui.org/api.php?addons=true&username=sindoku&Password=Tm9Hb2xkMS4zLjUuNw==').then(({ data }) => data);

        const addons = await getAddons();

        console.log('addons', addons)

        const getContent = (start, stop) => {
            window.addEventListener('scroll', () => {
                const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
                if ((scrollTop + clientHeight) >= scrollHeight) {
                    getContent(currData, start + 10, stop + 10);
                    window.scrollBy(0, scrollHeight + 600);
                }
            });

            const currData = addons.splice(start, stop);

            const getData = () => currData.forEach((addon) => {
                //create
                const container = createElement('div');
                container.classList.add('container');

                const wrapper = createElement('div');
                wrapper.classList.add('wrapper');

                const imgContainer = createElement('div');
                imgContainer.classList.add('img-container');

                const title = createElement('h1');
                title.classList.add('title');
                title.innerText = addon.name;

                const btn = createElement('button');
                btn.classList.add('btn');
                const atag = createElement('a');
                atag.classList.add('a-tag');

                btn.appendChild(atag);
                atag.innerText = 'Download';

                loadImage(addon.screenshot_url).then((image) => {
                    image.classList.add('img');

                    // append to elements to container
                    container.appendChild(wrapper);
                    wrapper.appendChild(title);
                    wrapper.appendChild(imgContainer);
                    imgContainer.appendChild(image);
                    wrapper.appendChild(btn);
                    atag.href = addon.web_url.replace('id=', 'download=');
                    // add main container to doc body
                    document.body.appendChild(container);
                });

            });

            getData();
        };

        const loadImage = src =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });

        const createElement = (name, options) => document.createElement(name, options);
        // debugger;
        getContent(0, 10);

    });
})();