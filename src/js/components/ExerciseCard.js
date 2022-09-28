import Component from '../Component.js';

export default class ExerciseCard extends Component{
    constructor(props, root) {
        super(props, root);
        this.render();
    }

    render() {
        const formatSetsAndReps = ({ sets, repRange, repType }) => {
            let formatted = sets.toString();
    
            switch (repRange.length) {
                case 0:
                    return formatted += ' sets';
                case 1:
                    return formatted += ` × ${repRange[0]} ${repType}`;
                default:
                    return formatted += ` × ${repRange[0]}-${repRange[1]} ${repType}`;
            }
        }

        const exerciseCardContainer = document.createElement('div');
        exerciseCardContainer.className = 'exercise-card-container';

        const wrapper = document.createElement('div');
        wrapper.className = 'exercise-wrapper';

        const order = document.createElement('span');
        order.className = 'order';
        order.textContent = this.props.order;

        const centerContent = document.createElement('div');
        centerContent.className = 'center-content';

        const exerciseName = document.createElement('h3');
        exerciseName.textContent = this.props.name;

        const setsAndReps = document.createElement('div');
        setsAndReps.className = 'sets-and-reps';
        setsAndReps.textContent = formatSetsAndReps(this.props.setsAndReps);

        const exerciseInfo = document.createElement('img');
        exerciseInfo.className = 'exercise-info';
        Component.setAttributes({
            'src': 'src/assets/info.svg',
            'alt': 'Click to see more info about the exercise.'
        }, exerciseInfo);

        this.root.appendChild(exerciseCardContainer);
        exerciseCardContainer.appendChild(wrapper);
        wrapper.appendChild(order);
        wrapper.appendChild(centerContent);
        centerContent.appendChild(exerciseName);
        centerContent.appendChild(setsAndReps);
        wrapper.appendChild(exerciseInfo);

        exerciseInfo.addEventListener('click', () => {
            new Modal({
                title: this.props.name,
                description: this.props.description,
                muscleFocus: this.props.muscleFocus
            }, document.body);
        });
    }
}

class Modal extends Component {
    constructor(props, root) {
        super(props, root);
        this.render();
    }

    render() {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';

        const modalContainer = document.createElement('div');
        modalContainer.className = 'prompt-container';

        const title = document.createElement('h3');
        title.textContent = this.props.title;

        const description = document.createElement('p');
        description.className = 'exercise-description';
        description.textContent = this.props.description;
        
        const muscleFocus = document.createElement('span');
        muscleFocus.className = 'exercise-description';
        muscleFocus.textContent = `Muscle focus: ${this.props.muscleFocus}`;

        const doneBtn = document.createElement('button');
        doneBtn.className = 'btn';
        doneBtn.textContent = 'Done';

        this.root.appendChild(overlay);
        overlay.appendChild(modalContainer);
        modalContainer.appendChild(title);
        modalContainer.appendChild(description);
        modalContainer.appendChild(muscleFocus);
        modalContainer.appendChild(doneBtn);

        overlay.addEventListener('click', e => {
            console.log(e.target);
            if (e.target !== overlay && e.target !== doneBtn) return;
            overlay.remove();
        });
    }
}