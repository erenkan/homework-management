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
    ],
    testTeachers: [] as any,

})
export type RootState = ReturnType<typeof state>
export const getters: GetterTree<RootState, RootState> = {
    teachers: (state) => state.teachers,
    testTeachers: (state) => state.testTeachers,
}
export const mutations: MutationTree<RootState> = {
    SET_HOME_WORK(state, payload): void {
        const modifiedArr = state.teachers.map((teacher) => {
            if (teacher.userId === payload.teacherId) {
                teacher.OwnStudents = teacher.OwnStudents.map((student) => {
                    if (student.id === payload.studentId) {
                        student.homeWorks.push(payload.homeWork)
                    }
                    return student
                })
            }
            return teacher
        })
        state.teachers = modifiedArr
    },
    // SET_TEACHERS: (state, payload) => {
    //     state.testTeachers = payload
    // },
    SET_TEACHERS: (state, payload: Record<string, any>) => (state.testTeachers = payload),

}

export const actions: ActionTree<RootState, RootState> = {
    async getTest({ commit }) {
        const studentResponse: Record<string, any> = await this.$axios.get(
            'https://6192b13fd3ae6d0017da823e.mockapi.io/api/teachers'
        )
        let teacherList: any[] = []
        if (studentResponse) {
            commit('SET_TEACHERS', studentResponse.data.slice())
            teacherList = studentResponse.data.map((student: { id: any; firstName: any; lastName: any; password: any; mail: any }) => {
                return {
                    id: student.id,
                    label: `${student.firstName} ${student.lastName}`,
                    password: student.password,
                    mail: student.mail
                }
            })
        }
        return teacherList;
    },
    fetchTeacher({ getters }, id) {
        console.log('getters.testTeachers', getters.testTeachers)
        const teacher = getters.testTeachers.find(
            (teacher: any) => teacher.id === id
        )
        if (teacher) {
            return teacher
        } else {
            return false
        }
    },
    async fetchTeachers({ commit, getters }, id) {
        const teacher = getters.teachers;
        if (teacher) {
            return teacher
        } else {
            return false;
        }

    },
    async createHomeWork({ commit, getters }, payload: Record<any, string>) {
        console.log('payload', payload)
        const homeWorkResponse: Record<string, any> = await this.$axios.put(
            `https://6192b13fd3ae6d0017da823e.mockapi.io/api/testSource/1`, payload.homeWork
        )

        // commit('SET_HOME_WORK', payload)
    }


}