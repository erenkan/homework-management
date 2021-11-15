<template>
  <!-- <Tutorial /> -->
  <b-container>
    <div class="w-full max-w-md">
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
          <button
            class="
              bg-red-500
              hover:bg-red-700
              text-white
              font-bold
              py-2
              px-4
              rounded
              focus:outline-none focus:shadow-outline
            "
            type="button"
            @click="
              loginType = 'admin'
              Login()
            "
          >
            Sign In (Admin)
          </button>
        </div>
      </form>
    </div>
    <div class="w-1/2 bg-white rounded-lg shadow">
      <ul class="divide-y-2 divide-gray-100">
        <li class="p-3">
          <h6 class="font-weight-bold">Admin</h6>

          <ul class="divide-y-2 divide-gray-100">
            <li>admin@smartface.io : smartface</li>
          </ul>
        </li>
        <li class="p-3">
          <h6 class="font-weight-bold">Teacher</h6>

          <ul class="divide-y-2 divide-gray-100">
            <li>teacher@nayanlewis.com : nayan</li>
            <li>teacher@hibbamayer.com : hibba</li>
            <li>teacher@abbywarren.com : abby</li>
          </ul>
        </li>
        <li class="p-3">
          <h6 class="font-weight-bold">Student</h6>

          <ul class="divide-y-2 divide-gray-100">
            <li>student@erenkan.com : eren</li>
            <li>student@gavinscott.com : gavin</li>
            <li>student@anwengiles.com : anven</li>
          </ul>
        </li>
      </ul>
    </div>
    <p class="mt-3 text-center text-gray-500 text-xs">&copy;Smartface Inc</p>
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
    async Login(isAdmin: String): Promise<void> {
      const response = await this.$store.dispatch('Login', {
        role: this.loginType,
        mail: this.mail,
        password: this.password,
      })
      console.log(response)
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
    async getStudents(): Promise<void> {
      const response = await this.$store.dispatch('fetchStudents')
      this.students = response.data.students
    },
    async setStudents(): Promise<void> {
      const response = await this.$store.dispatch('setStudent')
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>