import Component from '../Component.js';

export default class ExerciseCard extends Component{
    constructor(props, root) {
        super(props, root);
        this.render();
    }

    render() {
        const formatSetsAndReps = ({ sets, repRange }) => {
            let formatted = sets.toString();
    
            switch (repRange.length) {
                case 0:
                    return formatted += ' sets';
                case 1:
                    return formatted += ` × ${repRange[0]}`;
                default:
                    return formatted += ` × ${repRange[0]}-${repRange[1]}`;
            }
        }

        const exerciseCardContainer = document.createElement('div');
        exerciseCardContainer.className = 'exercise-card-container';

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';

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

        const addSetsContainer = document.createElement('div');
        addSetsContainer.className = 'add-sets-container';

        const plusBtn = document.createElement('span');
        plusBtn.className = 'add-btn';
        plusBtn.textContent = '+';

        const minusBtn = document.createElement('span');
        minusBtn.className = 'add-btn';
        minusBtn.textContent = '-';

        this.root.appendChild(exerciseCardContainer);
        exerciseCardContainer.appendChild(progressBar);
        exerciseCardContainer.appendChild(wrapper);
        wrapper.appendChild(order);
        wrapper.appendChild(centerContent);
        centerContent.appendChild(exerciseName);
        centerContent.appendChild(setsAndReps);
        wrapper.appendChild(addSetsContainer);
        addSetsContainer.appendChild(plusBtn);
        addSetsContainer.appendChild(minusBtn);
    }
}

/* <View key={id} style={[styles.container, styles.shadowProp]}>
    <View style={[styles.progressBar, { width: `${(setsAndReps.setsCompleted / setsAndReps.sets) * 100}%` }]}></View>
    <View style={styles.wrapper}>
        <Text style={styles.order}>{isWarmUp ? 'W' : order++}</Text>
        <View style={styles.centerContent}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.details}>
                <Text style={[styles.setsAndReps, { marginRight: 20 }]}>{formatSetsAndReps(setsAndReps)}</Text>
                <Text style={styles.setsAndReps}>{`Last session: ${lastSessionStats.amount} ${lastSessionStats.type}`}</Text>
            </View>
        </View>
        <TouchableOpacity onPress={() => setSelectedExercise(name)}>
            <Image style={styles.plus} source={setsAndReps.setsCompleted / setsAndReps.sets >= 1 ? require('../assets/icons/check.png') : require('../assets/icons/plus.png')} />
        </TouchableOpacity>
    </View>
</View> */