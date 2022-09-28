import Component from '../Component.js';
import ExerciseCard from './ExerciseCard.js';

export default class Header extends Component {
    constructor(props, root) {
        super(props, root);
        this.render();
    }

    render() {
        let selectedProgram = JSON.parse(localStorage.getItem('latest-program'));

        const setProgram = () => {
            if (Prompt.isOpen) return;

            new Prompt({
                default: programTitle.textContent,
                question: 'Select a program:',
                options: this.props.programs.map(prog => prog.programName)
            }, document.body).getResult().then(startProgram);
        }

        const startProgram = programName => {
            localStorage.setItem('latest-program', JSON.stringify(programName));
            selectedProgram = programName;
                
            const program = this.props.programs.find(prog => prog.programName === programName);

            // const date = new Date();

            console.log(program);
            programTitle.textContent = program?.programName ?? 'Choose a program';

            // program.days[0].exercises.forEach(day => { // change [0] to corresponding day
            //     new ExerciseCard(day, exercisesList);
            // });

            const list = program.days.find(day => day.name === JSON.parse(localStorage.getItem('latest-day'))) ?? program.days[0];
            console.log(list);

            programDay.textContent = `${list.name}` ?? '';

            setExerciseList(list.exercises ?? program.days[0].exercises); // change [0] to corresponding day
        }

        const setProgramDay = () => {
            const program = this.props.programs.find(prog => prog.programName === selectedProgram);

            new Prompt({
                default: programDay.textContent,
                question: 'Select a program:',
                options: program.days.map(day => day.name)
            }, document.body).getResult().then(selectedDay => {
                const list = program.days.find(day => day.name === selectedDay);

                localStorage.setItem('latest-day', JSON.stringify(selectedDay));

                programDay.textContent = list.name;
                startDay(list.exercises);
            });
        }

        const startDay = list => {
            setExerciseList(list);
        }

        const clearExerciseList = () => {
            while (exercisesList.firstChild) {
                exercisesList.removeChild(exercisesList.firstChild);
            }
        }

        const setExerciseList = list => {
            clearExerciseList();
            let order = 1;
            console.log(list);
            list.forEach(exercise => {
                new ExerciseCard({
                    ...exercise,
                    order: exercise.isWarmUp ? 'W' : order++
                }, exercisesList);
            });
        }

        const container = document.createElement('div');
        container.className = 'container';

        const programTitle = document.createElement('h1');
        programTitle.className = 'program-title';
        programTitle.textContent = selectedProgram === null ? 'Choose a program' : selectedProgram;

        const programDay = document.createElement('h2');
        programDay.className = 'program-day';

        const exercisesList = document.createElement('div');

        if (!selectedProgram) {
            setProgram();
        } else {
            startProgram(selectedProgram);
        }

        this.root.appendChild(container);
        container.appendChild(programTitle);
        container.appendChild(programDay);
        container.appendChild(exercisesList);

        programTitle.addEventListener('click', () => {
            setProgram();
        });

        programDay.addEventListener('click', () => {
            setProgramDay();
        });
    }
}

class Prompt extends Component {
    static isOpen = false;
    result = JSON.parse(localStorage.getItem('latest-program'));

    constructor(props, root) {
        super(props, root);
        this.result = props.default;
        this.render();
    }

    render() {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';

        const promptContainer = document.createElement('div');
        promptContainer.className = 'prompt-container';

        const question = document.createElement('h3');
        question.textContent = this.props.question;

        const rel = document.createElement('div');
        rel.className = 'rel';

        const doneBtn = document.createElement('button');
        doneBtn.id = 'done-btn';
        doneBtn.className = 'btn';
        doneBtn.textContent = 'Done';

        this.root.appendChild(overlay);
        overlay.appendChild(promptContainer);
        promptContainer.appendChild(question);
        promptContainer.appendChild(rel);

        console.log(this.props.options);
        
        new Dropdown({
            options: this.props.options,
            default: this.props.default
        }, rel).getResult().then(selectedOption => {
            this.result = selectedOption;
            // console.log(this.result);
        });
        
        promptContainer.append(doneBtn);
        
        Prompt.isOpen = true;
        
        overlay.addEventListener('click', e => {
            if (e.target !== overlay) return;
            if (localStorage.getItem('latest-program')) {
                overlay.remove();
                Prompt.isOpen = false;
            }
        });
    }

    async getResult() {
        return new Promise((resolve, _) => {
            document.querySelector('#done-btn').addEventListener('click', () => {
                if (!this.result) {
                    return console.error('baen? yes'); // must have value, send alert message
                }

                document.querySelector('.overlay').remove();
                Prompt.isOpen = false;
                return resolve(this.result);
            });
        });
    }
}

class Dropdown extends Component {
    constructor(props, root) {
        super(props, root);
        this.render();
    }

    render() {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';

        const optionsTitle = document.createElement('div');
        optionsTitle.className = 'options-title';

        const optionsList = document.createElement('div');
        optionsList.className = 'options-list';

        const defaultOption = document.createElement('span');
        defaultOption.className = 'default-option';
        // defaultOption.textContent = JSON.parse(localStorage.getItem('latest-program')) ?? 'No program selected';
        defaultOption.textContent = this.props.default ?? 'No program selected';
        
        const menuArrow = document.createElement('img');
        menuArrow.className = 'menu-arrow';
        Component.setAttributes({
            'src': 'src/assets/down-arrow.svg',
            'alt': 'Arrow that opens a dropdown menu.'
        }, menuArrow);

        this.props.options.forEach(option => {
            const optionBox = document.createElement('div');
            optionBox.className = 'option-box';
            optionBox.textContent = option;
            optionsList.appendChild(optionBox);
        });

        this.root.appendChild(optionsContainer);
        optionsContainer.appendChild(optionsTitle);
        optionsTitle.appendChild(defaultOption);
        optionsTitle.appendChild(menuArrow);
        optionsContainer.appendChild(optionsList);

        optionsTitle.addEventListener('click', () => {
            if (optionsList.style.display === 'none' || !optionsList.style.display) {
                optionsList.style.display = 'block';
                menuArrow.style.transform = 'rotate(-180deg)'; // TODO: css animate
            } else {
                optionsList.style.display = 'none';
                menuArrow.style.transform = 'rotate(0deg)';
            }
        });
    }

    async getResult() {
        return new Promise((resolve, _) => {
            document.querySelectorAll('.option-box').forEach(optionBox => {
                optionBox.addEventListener('click', () => {
                    document.querySelector('.options-list').style.display = 'none';
                    document.querySelector('.default-option').textContent = optionBox.textContent;
                    document.querySelector('.menu-arrow').style.transform = 'rotate(0deg)';
                    return resolve(optionBox.textContent);
                });
            });
        });
    }
}