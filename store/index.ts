import { GetterTree, ActionTree, MutationTree } from 'vuex'
export const state = () => ({
  admin: {} as Record<string, any>,
  adminList: [] as any,
})
export const strict = false

export type RootState = ReturnType<typeof state>
export const getters: GetterTree<RootState, RootState> = {
  admin: (state) => state.admin,
  adminList: (state) => state.adminList,
}
export const mutations: MutationTree<RootState> = {
  SET_ADMIN: (state, payload: Record<string, any>) => (state.admin = payload),
  SET_ADMIN_LIST: (state, payload: Record<string, any>) => (state.adminList = payload),
}
export const actions: ActionTree<RootState, RootState> = {
  /**
* @instance {commit} to commit the mutation to set the admin
*/
  async fetchAdmin({ commit }) {
    const response = await this.$axios.get('https://6192b13fd3ae6d0017da823e.mockapi.io/api/admin')
    if (response.status === 200) {
      commit('SET_ADMIN', response.data)
      const adminList = response.data.map((admin: { id: any; name: any; password: any; mail: any }) => {
        return {
          id: admin.id,
          label: admin.name,
          password: admin.password,
          mail: admin.mail
        }
      })
      commit('SET_ADMIN_LIST', adminList)
    }
  },
  /**
   * Login.
* @instance {rootState} to access the root state
* @param {rootState} to access the rootState
*/
  async Login({ rootState }, payload) {
    if (payload.role === 'teacher') {
      const foundTeacher = rootState.teacher.teachers.find((teacher: { mail: any; password: any; }) => teacher.mail === payload.mail && teacher.password === payload.password)
      if (foundTeacher) {
        return {
          loginAs: payload.role,
          id: foundTeacher.id
        }
      }
    }
    else if (payload.role === 'student') {
      const foundStudent = rootState.student.students.find((student: { mail: any; password: any; }) => student.mail === payload.mail && student.password === payload.password)
      if (foundStudent) {
        return {
          loginAs: payload.role,
          id: foundStudent.id
        }
      }
    } else if (payload.role === 'admin') {
      const foundAdmin = rootState.admin.find((admin: { mail: any; password: any; }) => admin.mail === payload.mail && admin.password === payload.password)
      if (foundAdmin) {
        return {
          loginAs: payload.role,
          id: foundAdmin.id
        }
      }
    } else {
      return false
    }
  },
}