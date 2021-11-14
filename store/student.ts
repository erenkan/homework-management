import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    students: [{
        id: 1,
        fullName: 'Eren Kan',
        mail: 'student@erenkan.com',
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
        role: 'student',
        fullName: 'Gavin Scott',
        mail: 'student@gavinscott.com',
        homeWorks: [{
            lesson: 'Math',
            description: 'solve the problems in math book',
            status: true,
            isDone: false,
            assignment: null,
        }]
    },
    ],

})
export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
    CHANGE_NAME: (state, payload) => {
        state.students.push(payload);
    },
}

export const actions: ActionTree<RootState, RootState> = {
    async fetchStudent({ commit }, id) {
        const student = state().students.find(student => student.id === id)
        if (student) {
            return student
        } else {
            return false;
        }
    },
    async fetchStudents({ commit }, id) {
        return state().students
    },
    async setStudent({ commit }, payload) {
        commit('CHANGE_NAME', payload)
    },

}