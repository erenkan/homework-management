import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    students: [] as any,
    studentsList: [] as any,

})
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    studentsList: (state) => state.studentsList,
    getStudentById: (state) => (id: number) => {
        return state.students.find((student: { id: number }) => student.id === id)
    }
}
export const mutations: MutationTree<RootState> = {
    SET_STUDENTS: (state, payload) => (state.students = payload),
    SET_STUDENTS_LIST: (state, payload: Record<string, any>) => (state.studentsList = payload),
}

export const actions: ActionTree<RootState, RootState> = {
        /**
     * @instance {getters} to get the students from state
     */
    async fetchStudent({ getters }, id) {
        const student = getters.students.find((student: { id: any }) => student.id === id)
        if (student) {
            return student
        } else {
            return false;
        }
    },
    /**
 * @instance {dispatch} to dispatch the action
 * @param {payload} to get payload data from the main dispatcher
 */
    async setStudentHomework({ dispatch }, payload) {
        const studentResponse: Record<string, any> = await this.$axios.put(
            `https://6192b13fd3ae6d0017da823e.mockapi.io/api/students/${payload.studentId}`, {
            homeWorks: payload.ownStudents.find((student: { id: any }) => student.id === payload.studentId).homeWorks
        }
        );
        if (studentResponse) {
            dispatch('getStudents')
        }
    },
    /**
  * @instance {commit} to commit the mutation
  */
    async getStudents({ commit }) {
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
            commit('SET_STUDENTS_LIST', studentList);
        }
    }

}