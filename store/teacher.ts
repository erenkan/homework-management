import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    teachers: [{
        id: 1,
        userId: 4,
        fullName: 'Nayan Lewis',
        OwnStudents: [{
            id: 1,
            mail: 'student@erenkan.com',
            fullName: 'Eren Kan',
            homeWorks: [{
                lesson: 'Math',
                description: 'solve the problems in math book',
                status: true,
                isDone: false,
                isOverdue: false,
                assignment: null,
            },
            {
                lesson: 'Tech',
                description: 'lab test',
                status: false,
                isDone: true,
                isOverdue: false,
                assignment: null,
            },
            {
                lesson: 'Reading',
                description: 'read the book',
                status: false,
                isDone: false,
                isOverdue: false,
                assignment: null,
            }
            ]
        },
        {
            id: 3,
            fullName: 'Gavin Scott',
            mail: 'student@gavinscott.com',
            homeWorks: [{
                lesson: 'Tech',
                description: 'lab test',
                status: true,
                isDone: true,
                assignment: null,
            }]
        }
        ]
    },
    {
        id: 2,
        userId: 5,
        fullName: 'Hibba Mayer',
        OwnStudents: [
            {
                id: 3,
                fullName: 'Gavin Scott',
                mail: 'student@gavinscott.com',
                homeWorks: [{
                    lesson: 'Math',
                    description: 'solve the problems in math book',
                    status: true,
                    isDone: false,
                    assignment: null,
                }]
            }
        ]
    },
    {
        id: 3,
        userId: 6,
        fullName: 'Abby Warren',
        OwnStudents: [{
            id: 1,
            mail: 'student@erenkan.com',
            fullName: 'Eren Kan',
            homeWorks: [{
                lesson: 'Math',
                description: 'solve the problems in math book',
                status: true,
                isDone: false,
                assignment: null,
            }]
        },
        {
            id: 2,
            fullName: 'Anwen Giles',
            mail: 'student@anwengiles.com',
            homeWorks: [{
                lesson: 'Math',
                description: 'solve the problems in math book',
                status: true,
                isDone: false,
                assignment: null,
            }]
        },
        {
            id: 3,
            fullName: 'Gavin Scott',
            mail: 'student@gavinscott.com',
            homeWorks: [{
                lesson: 'Science',
                description: 'chemical reaction examples',
                status: true,
                isDone: false,
                assignment: null,
            }]
        }
        ]
    },
    ]

})
export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
    CHANGE_NAME: (state, payload) => {
        state.teachers.push(payload);
    },
}

export const actions: ActionTree<RootState, RootState> = {
    fetchTeacher({ commit, getters }, id) {
        const teacher = state().teachers.find(teacher => teacher.userId === id)
        if (teacher) {
            return teacher
        } else {
            return false;
        }
    },
    async fetchTeachers({ commit, getters }, id) {
        const teacher = state().teachers
        if (teacher) {
            return teacher
        } else {
            return false;
        }

    },


}