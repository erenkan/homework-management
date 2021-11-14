import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  // Users
  users: [
    {
      id: 10,
      role: 'admin',
      fullName: 'Smartface',
      mail: 'admin@smartface.io',
      password: 'smartface',

    },
    {
      id: 1,
      role: 'student',
      fullName: 'Eren Kan',
      mail: 'student@erenkan.com',
      password: 'eren'
    },
    {
      id: 2,
      role: 'student',
      fullName: 'Anwen Giles',
      mail: 'student@anwengiles.com',
      password: 'anwen'
    },
    {
      id: 3,
      role: 'student',
      fullName: 'Gavin Scott',
      mail: 'student@gavinscott.com',
      password: 'gavin'
    },
    {
      id: 4,
      role: 'teacher',
      fullName: 'Nayan Lewis',
      mail: 'teacher@nayanlewis.com',
      password: 'nayan'
    },
    {
      id: 5,
      role: 'teacher',
      fullName: 'Hibba Mayer',
      mail: 'teacher@hibbamayer.com',
      password: 'hibba'
    },
    {
      id: 6,
      role: 'teacher',
      fullName: 'Abby Warren',
      mail: 'teacher@abbywarren.com',
      password: 'abby'
    }],
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  async Login({ commit }, payload) {
    console.log(payload)
    let response = state().users.find(usr => usr.role === payload.role && usr.password === payload.password && usr.mail === payload.mail)
    if (response) {
      return {
        loginAs: payload.role,
        id: response.id
      }
    } else {
      return false
    }
  },
}