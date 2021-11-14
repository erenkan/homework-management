<template>
  <b-container v-if="student">
    <b-card no-body class="overflow-hidden" style="max-width: 540px">
      <b-row no-gutters>
        <b-col md="3">
          <b-card-img
            src="https://picsum.photos/400/400/?image=20"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="9">
          <b-card-body >
            <b-card-text>
              <b-media tag="li">
                <template #aside>
                  <b-avatar
                    href="#bar"
                    src="https://placekitten.com/300/300"
                  ></b-avatar>
                </template>
                <h5 class="mt-0 mb-1">{{student.fullName}}</h5>
                <p class="mb-0">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, laborum?
                </p>
              </b-media>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      student: null,
    }
  },
  created() {
    console.log(this.$route)
    if (this.$route.params && this.$route.params.id !== undefined) {
      this.getStudent(this.$route.params.id)
    }
  },
  methods: {
    async getStudent(id: String): Promise<void> {
      const response = await this.$store.dispatch('fetchStudent', id)
      console.log('studend PAge rsop', response)
      if (response) {
        this.student = response
      }
    },
  },
}
</script>

<style>
</style>