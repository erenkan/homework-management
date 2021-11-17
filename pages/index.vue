<template>
  <section class="bg-blueGray-50">
    <link
      rel="stylesheet"
      href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
    />
    <link
      rel="stylesheet"
      href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
    />

    <div class="w-full lg:w-6/12 px-4 mx-auto pt-6">
      <div
        class="
          relative
          flex flex-col
          min-w-0
          break-words
          w-full
          mb-6
          shadow-lg
          rounded-lg
          bg-blueGray-200
          border-0
        "
      >
        <div class="rounded-t mb-0 px-6 py-6">
          <small>Homework Management</small>
          <hr class="mt-6 border-b-1 border-blueGray-300" />
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div class="text-blueGray-400 text-center mb-3 font-bold"></div>
          <form>
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-password"
                >Email</label
              ><input
                v-model="mail"
                type="email"
                class="
                  border-0
                  px-3
                  py-3
                  placeholder-blueGray-300
                  text-blueGray-600
                  bg-white
                  rounded
                  text-sm
                  shadow
                  focus:outline-none focus:ring
                  w-full
                  ease-linear
                  transition-all
                  duration-150
                "
                placeholder="Email"
              />
            </div>
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-password"
                >Password</label
              ><input
                v-model="password"
                type="password"
                class="
                  border-0
                  px-3
                  py-3
                  placeholder-blueGray-300
                  text-blueGray-600
                  bg-white
                  rounded
                  text-sm
                  shadow
                  focus:outline-none focus:ring
                  w-full
                  ease-linear
                  transition-all
                  duration-150
                "
                placeholder="Password"
              />
            </div>
            <div>
              <label class="inline-flex items-center cursor-pointer">
                <b-form-checkbox
                  v-model="loginType"
                  name="check-button"
                  value="teacher"
                  unchecked-value="student"
                >
                </b-form-checkbox>
                <span class="ml-2 text-sm font-semibold text-blueGray-600"
                  >Sign in as Teacher</span
                ></label
              >
            </div>
            <div class="btn-wrapper text-center mt-6">
              <button
                @click="Login"
                class="
                  bg-blueGray-800
                  text-white
                  active:bg-blueGray-600
                  text-sm
                  font-bold
                  uppercase
                  px-6
                  py-3
                  rounded
                  shadow
                  hover:shadow-lg
                  outline-none
                  focus:outline-none
                  mr-1
                  mb-1
                  ease-linear
                  transition-all
                  duration-150
                "
                type="button"
              >
                Sign In
              </button>
              <button
                @click="
                  loginType = 'admin'
                  Login()
                "
                class="
                  bg-red-700
                  text-white
                  active:bg-red-700
                  text-sm
                  font-bold
                  uppercase
                  px-6
                  py-3
                  rounded
                  shadow
                  hover:shadow-lg
                  outline-none
                  focus:outline-none
                  mr-1
                  mb-1
                  ease-linear
                  transition-all
                  duration-150
                "
                type="button"
              >
                Sign In as Admin
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="w-full bg-white rounded-lg shadow">
        <div class="d-flex justify-content-between">
          <b-form-group label="Teachers" label-for="studentSelect" class="p-3">
            <treeselect
              v-model="selectedTeacher"
              :multiple="false"
              :options="teacherList"
              @select="selectedTeacherEvent"
            />
          </b-form-group>
          <b-form-group label="Students" label-for="teacherSelect" class="p-3">
            <treeselect
              v-model="selectedStudent"
              :multiple="false"
              :options="studentList"
              @select="selectedStudentEvent"
            />
          </b-form-group>
          <b-form-group label="Admins" label-for="adminSelect" class="p-3">
            <treeselect
              v-model="selectedAdmin"
              :multiple="false"
              :options="adminList"
              @select="selectedAdminEvent"
            />
          </b-form-group>
        </div>
      </div>
    </div>
    <footer class="relative pt-8 pb-6 mt-2">
      <div class="container mx-auto px-2">
        <div
          class="flex flex-wrap items-center md:justify-between justify-center"
        >
          <div class="w-full md:w-6/12 px-4 mx-auto text-center">
            <div class="text-sm text-blueGray-500 font-semibold py-1">
              Smartface Inc
            </div>
          </div>
        </div>
      </div>
    </footer>
  </section>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      userRole: null,
      loginType: 'student',
      mail: null,
      password: null,
      students: null,
      teachers: null,
      selectedStudent: null,
      selectedTeacher: null,
      selectedAdmin: null,
    }
  },
  computed: {
    ...mapGetters({
      teacherList: 'teacher/teacherList',
      studentList: 'student/studentsList',
      adminList: 'adminList',
    }),
  },
  created(): void {
    this.getTeachers()
    this.getStudents()
    this.fetchAdmin()
  },

  methods: {
    /**
     * @param {node} Record<string, any> - The record of the selected node
     */
    selectedStudentEvent(node: Record<string, any>): void {
      this.selectedTeacher = null
      this.selectedAdmin = null
      this.mail = node.mail
      this.password = node.password
      this.loginType = 'student'
    },
    /**
     * @param {node} Record<string, any> - The record of the selected node
     */
    selectedTeacherEvent(node: Record<string, any>): void {
      this.selectedStudent = null
      this.selectedAdmin = null
      this.mail = node.mail
      this.password = node.password
      this.loginType = 'teacher'
    },
    /**
     * @param {node} Record<string, any> - The record of the selected node
     */
    selectedAdminEvent(node: Record<string, any>): void {
      this.selectedTeacher = null
      this.selectedStudent = null
      this.mail = node.mail
      this.password = node.password
    },
    async Login(): Promise<void> {
      const response = await this.$store.dispatch('Login', {
        role: this.loginType,
        mail: this.mail,
        password: this.password,
      })
      if (response) {
        this.userRole = response.loginAs
        if (response.loginAs === 'student') {
          this.$router.push({ name: 'student', params: { id: response.id } })
        }
        if (response.loginAs === 'teacher') {
          this.$router.push({ name: 'teacher', params: { id: response.id } })
        }
        if (response.loginAs === 'admin') {
          this.$router.push({ name: 'admin' })
        }
      } else {
        this.makeToast(
          'warning',
          'You have entered an invalid username or password'
        )
      }
    },
    getStudents(): void {
      this.$store.dispatch('student/getStudents')
    },
    getTeachers(): void {
      this.$store.dispatch('teacher/getTeachers')
    },
    fetchAdmin(): void {
      this.$store.dispatch('fetchAdmin')
    },

    makeToast(variant: String, body: String) {
      this.$bvToast.toast(body, {
        title: `Warning`,
        variant: variant,
        solid: true,
      })
    },
  },
})
</script>

<style>
</style>