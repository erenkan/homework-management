import { GetterTree, ActionTree, MutationTree } from 'vuex'


export const state = () => ({
    teachers: [] as any,
    teacherList: [] as any,

})
export type RootState = ReturnType<typeof state>
export const getters: GetterTree<RootState, RootState> = {
    teachers: (state) => state.teachers,
    teacherList: (state) => state.teacherList,
    getTeacherById: (state) => (id: number) => {
        return state.teachers.find((teacher: { id: number }) => teacher.id === id)
    }
}
export const mutations: MutationTree<RootState> = {
    SET_TEACHERS: (state, payload: Record<string, any>) => (state.teachers = payload),
    SET_TEACHERS_LIST: (state, payload: Record<string, any>) => (state.teacherList = payload),

}

export const actions: ActionTree<RootState, RootState> = {
    /**
     * @instance {commit} to commit the mutation
     */
    async getTeachers({ commit }) {
        const studentResponse: Record<string, any> = await this.$axios.get(
            'https://6192b13fd3ae6d0017da823e.mockapi.io/api/teachers'
        )
        let teacherList: any[] = []
        if (studentResponse) {
            commit('SET_TEACHERS', studentResponse.data)
            teacherList = studentResponse.data.map((student: { id: any; firstName: any; lastName: any; password: any; mail: any }) => {
                return {
                    id: student.id,
                    label: `${student.firstName} ${student.lastName}`,
                    password: student.password,
                    mail: student.mail
                }
            })
            commit('SET_TEACHERS_LIST', teacherList)
        }
    },
    /**
  * @instance {commit} to commit the mutation
  * @instance {getters} to get the getters
  * @param {payload} to get payload data from the main dispatcher
  */
    async createHomeWork({ commit, getters, dispatch }, payload: Record<any, string>) {
        const homeWorkResponse: Record<string, any> = await this.$axios.put(
            `https://6192b13fd3ae6d0017da823e.mockapi.io/api/teachers/${payload.teacherId}`, { ownStudents: payload.ownStudents }
        )
        dispatch('getTeachers')
        dispatch('student/setStudentHomework',payload,{ root: true })
    }


}