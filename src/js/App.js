import Component from './Component.js';
import Header from './components/Header.js';

export default class App extends Component {
    constructor(props, root) {
        super(props, root);
        this.render();
    }

    render() {
        const programs = [
            {
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
                            },
                            {
                                id: '1',
                                name: 'BENCH',
                                isWarmUp: false,
                                setsAndReps: {
                                    sets: 2,
                                    repRange: [15],
                                    setsCompleted: 2
                                }
                            }
                        ]
                    },
                    {
                        name: 'Push Day B',
                        isRestDay: false,
                        exercises: [
                            {
                                id: '0',
                                name: 'Ben-ups',
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
            },
            {
                details: {
                    programName: 'Eagle Lake',
                    startOn: 1 // 0 => SUN, 6 => SAT
                },
                days: [
                    {
                        name: 'Push Day A',
                        isRestDay: false,
                        exercises: [
                            {
                                id: '0',
                                name: 'Bench-press',
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
        ]

        new Header({ programs }, root);
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