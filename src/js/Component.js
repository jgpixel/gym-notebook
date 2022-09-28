export default class Component {
    constructor(props, root) {
        this.props = props;
        this.root = root;
    }

    static setAttributes(attributes, element) {
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    }

    static getElementOffset(element) {
        const rect = element.getBoundingClientRect();
        
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    static fadeInAnimations(root) {
        const appearOptions = {
            threshold: 0,
            rootMargin: '0px 0px -100px 0px'
        };

        const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            });
        }, appearOptions);

        let faders = document.querySelectorAll('.fade-in');

        const observeOptions = {
            childList: true
        }

        const mutationObserver = new MutationObserver(() => {
            faders = document.querySelectorAll('.fade-in');

            faders.forEach(fader => {
                appearOnScroll.observe(fader);
            });
        });

        mutationObserver.observe(root, observeOptions);
    }

    static appendChildren(elements, root) {
        elements.forEach(element => {
            root.appendChild(element);
        });
    }
}