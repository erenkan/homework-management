import { GetterTree, ActionTree, MutationTree } from 'vuex'
import mock from '@/fake-db/mock'

export const state = () => ({
  things: [] as string[],
  name: 'Me',
  users: [{
    id: 1,
    role: 'student',
    fullName: 'Eren Kan',
    mail: 'student@erenkan.com',
    password: 'eren'
  },
  {
    id: 1,
    role: 'teacher',
    fullName: 'Nayan Lewis',
    mail: 'teacher@nayanlewis.com',
    password: 'nayan'
  }],
  students: [{
    id: 1,
    fullName: 'Eren Kan',
    class: '5B'
  },
  ],
  teachers: [{
    id: 1,
    fullName: 'Nayan Lewis',
    OwnStudents: ['student@erenkan.com']
  },
  ]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  students: state => state.students,
}

export const mutations: MutationTree<RootState> = {
  CHANGE_NAME: (state, payload) => {
    state.students.push(payload);
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchStudents({ commit }) {
    const things = await this.$axios.get('/students')
    console.log('STUDENTS', things)
    // commit('CHANGE_NAME', 'New name')
    return things
  },
  async fetchStudent({ commit, getters }, id) {
    console.log(id)
    const student = state().students.find(student => student.id === id)
    console.log('STUDENT', student)

    if (student) {
      return student
    } else {
      return false;
    }

    // commit('CHANGE_NAME', 'New name')
  },
  async fetchTeacher({ commit, getters }, id) {
    console.log(id)
    const teacher = state().teachers.find(student => student.id === id)
    console.log('teacher', teacher)

    if (teacher) {
      return teacher
    } else {
      return false;
    }

    // commit('CHANGE_NAME', 'New name')
  },
  async setStudent({ commit }, payload) {
    commit('CHANGE_NAME', payload)
  },
  async Login({ commit }, payload) {
    let response = state().users.find(usr => usr.role === payload.role && usr.password === payload.password && usr.mail === payload.mail)
    if (response) {
      return {
        loginAs: payload.role
      }
    } else {
      return false
    }


  },
}

mock.onGet("/students").reply(200, {
  students: state().students
});
mock.onGet("/students", { id: 1 }).reply(200, {
  students: state().students
});
