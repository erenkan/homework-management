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
    testStudents: []

})
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    testStudents: (state) => state.testStudents,
}
export const mutations: MutationTree<RootState> = {
    SET_STUDENTS: (state, payload) => {
        state.testStudents = payload
    },
}

export const actions: ActionTree<RootState, RootState> = {
    async fetchStudent({ getters }, id) {
        const student = getters.testStudents.find((student: { id: any }) => student.id === id)
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
    async getTest({ commit }, id) {
        const studentResponse: Record<string, any> = await this.$axios.get(
            'https://6192b13fd3ae6d0017da823e.mockapi.io/api/students'
        )
        commit('SET_STUDENTS', studentResponse.data)
        let studentList: any[] = []
        if (studentResponse) {
            studentList = studentResponse.data.map((student: { id: any; firstName: any; lastName: any; password: any; mail: any }) => {
                return {
                    id: student.id,
                    label: `${student.firstName} ${student.lastName}`,
                    password: student.password,
                    mail: student.mail
                }
            })
        }
        return studentList;
    }

}