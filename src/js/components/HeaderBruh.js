import Component from '../Component.js';

const program = {
    details: {
        programName: 'PPL',
        startOn: 1 // 0 => SUN, 6 => SAT
    },
    days: [
        {
            name: 'Push Day A',
            isRestDay: false,
            exercises: [
                {
                    id: '0',
                    name: 'Push-ups',
                    isWarmUp: true,
                    setsAndReps: {
                        sets: 2,
                        repRange: [15],
                        setsCompleted: 2
                    }
                }
            ]
        }
    ]
}

export default class Header extends Component {
    constructor(props, root) {
        super(props, root);
        this.render();
    }

    render() {
        const setProgram = () => {
            if (Prompt.isOpen) return;

            new Prompt({
                question: 'Select a program:',
                options: [
                    'PPL',
                    'LEANa',
                    'BAEN',
                    'yes?'
                ]
            }, document.body);

            // new Prompt({
            //     question: 'Select a program:',
            //     options: [
            //         'PPL',
            //         'LEANa',
            //         'BAEN',
            //         'yes?'
            //     ]
            // }, document.body).getResult().then(newSelectedProgram => {
            //     programTitle.textContent = newSelectedProgram;
            //     // localStorage.setItem('latest-program', JSON.stringify(newSelectedProgram)); // !un-comment
            //     // fetch program from contentfuls list
            // });
        }

        const selectedProgram = localStorage.getItem('latest-program');

        const programTitle = document.createElement('h1');
        programTitle.textContent = selectedProgram?.details?.programName ?? 'Choose a program';

        if (!selectedProgram) {
            setProgram();
        }

        this.root.appendChild(programTitle);

        programTitle.addEventListener('click', () => {
            setProgram();
        });
    }
}

class Prompt extends Component {
    static isOpen = false;

    constructor(props, root) {
        super(props, root);
        this.render();
    }

    render() {
        // const input = document.createElement('input');
        // this.root.appendChild(input);

        const overlay = document.createElement('div');
        overlay.className = 'overlay';

        const promptContainer = document.createElement('div');
        promptContainer.className = 'prompt-container';

        const question = document.createElement('h3');
        question.textContent = this.props.question;

        const optionsTitle = document.createElement('div');
        optionsTitle.className = 'options-title';

        const defaultOption = document.createElement('span');
        defaultOption.textContent = localStorage.getItem('latest-program') ?? '...';
        
        const menuArrow = document.createElement('img');
        menuArrow.className = 'menu-arrow';
        Component.setAttributes({
            'src': 'src/assets/down-arrow.svg',
            'alt': 'Arrow that opens a dropdown menu.'
        }, menuArrow);

        this.root.appendChild(overlay);
        overlay.appendChild(promptContainer);

        promptContainer.appendChild(question);
        promptContainer.appendChild(optionsTitle);
        
        optionsTitle.appendChild(defaultOption);
        optionsTitle.appendChild(menuArrow);

        Prompt.isOpen = true;
    }

    async getResult() {
        return new Promise((resolve, _) => {
            // document.getElementsByTagName('input')[0].addEventListener('input', e => {
            //     document.getElementsByTagName('input')[0].remove(); // dismounts prompt
            //     Prompt.isOpen = false;

            //     // remove event listener
            //     return resolve(e.target.value);
            // });
            // Prompt.isOpen = false;
            // return resolve('bruh');
        });
    }
}


/* 

const program = {
    details: {
        programName: 'PPL',
        startOn: 1 // 0 => SUN, 6 => SAT
    },
    days: [
        {
            name: 'Push Day A',
            isRestDay: false,
            exercises: [
                {
                    id: '0',
                    name: 'Push-ups',
                    isWarmUp: true,
                    setsAndReps: {
                        sets: 2,
                        repRange: [15],
                        setsCompleted: 2
                    }
                }
            ]
        }
    ]
}

*/