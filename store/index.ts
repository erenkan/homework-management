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
    id: 2,
    role: 'student',
    fullName: 'Anwen Giles',
    mail: 'student@anwengiles.com',
    password: 'eren'
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
  students: [{
    id: 1,
    fullName: 'Eren Kan',
    mail: 'student@erenkan.com',
  },
  {
    id: 2,
    fullName: 'Anwen Giles',
    mail: 'student@anwengiles.com',
  },
  {
    id: 3,
    role: 'student',
    fullName: 'Gavin Scott',
    mail: 'student@gavinscott.com',
  },
  ],
  test: [
    {
      id: 1,
      userId: 4,
      fullName: 'Nayan Lewis',
      OwnStudents: [{
        id: 1,
        mail: 'student@erenkan.com',
        fullName: 'Eren Kan',
      },

      {},
      ]
    }
  ],
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
    id: 2,
    userId: 5,
    fullName: 'Hibba Mayer',
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
    userId: 5,
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
        lesson: 'Math',
        description: 'solve the problems in math book',
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
    // commit('CHANGE_NAME', 'New name')
    return things
  },
  async fetchStudent({ commit, getters }, id) {
    const student = state().students.find(student => student.id === id)
    if (student) {
      return student
    } else {
      return false;
    }

    // commit('CHANGE_NAME', 'New name')
  },
  async fetchTeacher({ commit, getters }, id) {
    const teacher = state().teachers.find(teacher => teacher.userId === id)
    if (teacher) {
      return teacher
    } else {
      return false;
    }

    // commit('CHANGE_NAME', 'New name')
  },
  async fetchOwnStudents({ commit, getters }, id) {
    const students = state().students.filter(student => student.id === id)
    console.log('fetchOwnStudents', students)
    if (students.length > 0) {
      return students
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
        loginAs: payload.role,
        id: response.id
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
