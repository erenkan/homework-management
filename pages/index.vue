<template>
  <!-- <Tutorial /> -->
  <b-container>
    <div class="w-full max-w-xs">
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css"
        rel="stylesheet"
      />

      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        v-if="userRole === null"
      >
        <div class="mb-4">
          <b-form-checkbox
            v-model="loginType"
            name="check-button"
            value="teacher"
            unchecked-value="student"
          >
            <b>Teacher Login</b>
          </b-form-checkbox>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>

          <input
            id="username"
            v-model="mail"
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            id="password"
            v-model="password"
            class="
              shadow
              appearance-none
              border border-red-500
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              mb-3
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            type="password"
            placeholder="******************"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="
              bg-blue-500
              hover:bg-blue-700
              text-white
              font-bold
              py-2
              px-4
              rounded
              focus:outline-none focus:shadow-outline
            "
            type="button"
            @click="Login"
          >
            Sign In
          </button>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">&copy;Smartface Inc</p>
    </div>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      userRole: null,
      loginType: 'student',
      mail: null,
      password: null,
      students: null,
      counter: 0,
    }
  },

  methods: {
    async Login(): Promise<void> {
      const response = await this.$store.dispatch('Login', {
        role: this.loginType,
        mail: this.mail,
        password: this.password,
      })
      console.log(response)
      if (response) {
        this.userRole = response.loginAs
      }
      // if (this.loginType === 'student') {
      //   const response = await this.$store.dispatch('Login', {
      //     role: 'student',
      //     mail: this.mail,
      //     password: this.password,
      //   })
      //   if (response) {
      //     console.log(response)
      //     this.userRole = 'student'
      //   }
      // }
    },
    async getStudents(): Promise<void> {
      // const response = await this.$axios.get('/students')
      const response = await this.$store.dispatch('fetchStudents')
      // console.log(this.$store);
      this.students = response.data.students
      console.log('INDEX RESPONSE', response)
    },
    async setStudents(): Promise<void> {
      const response = await this.$store.dispatch('setStudent')
    },
  },
  computed: {
    count(): number {
      // ADD
      return this.counter
    },
  },
  watch: {
    userRole(val) {
      if (val === 'student') {
        this.$router.push({ name: 'student', params: { id: 1 } })
      }
       if (val === 'teacher') {
        this.$router.push({ name: 'teacher', params: { id: 1 } })
      }
    },
  },
})
</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>