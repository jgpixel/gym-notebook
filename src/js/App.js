import Component from './Component.js';
import Header from './components/Header.js';

const fakePrograms = [
    {
        programName: 'PPL',
        startOn: 1,
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
                            repType: 'reps'
                        },
                        description: 'Lorem ipsum dolor sit amet.'
                    },
                    {
                        id: '1',
                        name: 'BENCH',
                        isWarmUp: false,
                        setsAndReps: {
                            sets: 2,
                            repRange: [15],
                            repType: 'reps'
                        },
                        description: 'Lorem ipsum dolor sit amet.'
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
                            repType: 'reps'
                        },
                        description: 'Lorem ipsum dolor sit amet.'
                    }
                ]
            }
        ]
    },
    {
        programName: 'Eagle Lake',
        startOn: 1,
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
                            repType: 'reps'
                        },
                        description: 'Lorem ipsum dolor sit amet.'
                    }
                ]
            }
        ]
    }
];

export default class App extends Component {
    constructor(props, root) {
        super(props, root);
        this.render();
    }

    render() {
        const fetchPrograms = async () => {
            const client = contentful.createClient({
                space: 'abg53jltd4yt',
                accessToken: 'EaC9gapKjDk-_yXqc30A2NBxRIxFNqje-1g-iyjdlXk'
            });

            const entries = await client.getEntries({
                content_type: 'program'
            });

            return entries.items.map(item => item.fields);
        }

        fetchPrograms().then(programs => {
            new Header({ programs }, this.root);
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

/* 
const programs = [
                {
                    programName: 'PPL',
                    startOn: 1,
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
                                        repType: 'reps'
                                    },
                                    description: 'Lorem ipsum dolor sit amet.'
                                },
                                {
                                    id: '1',
                                    name: 'BENCH',
                                    isWarmUp: false,
                                    setsAndReps: {
                                        sets: 2,
                                        repRange: [15],
                                        repType: 'reps'
                                    },
                                    description: 'Lorem ipsum dolor sit amet.'
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
                                        repType: 'reps'
                                    },
                                    description: 'Lorem ipsum dolor sit amet.'
                                }
                            ]
                        }
                    ]
                },
                {
                    programName: 'Eagle Lake',
                    startOn: 1,
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
                                        repType: 'reps'
                                    },
                                    description: 'Lorem ipsum dolor sit amet.'
                                }
                            ]
                        }
                    ]
                }
            ];
            return new Promise((resolve, _) => {
                setTimeout(() => {
                    return resolve(programs);
                }, 100);
            });

*/