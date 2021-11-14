<template>
  <b-container v-if="teacher">
    <b-card no-body class="overflow-hidden" style="max-width: 540px">
      <b-row no-gutters>
        <b-col md="4">
          <b-card-img
            src="https://picsum.photos/id/1/400/500"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="8">
          <b-card-body >
            <b-card-text>
              <b-media tag="li">
                <template #aside>
                  <b-avatar
                    href="#bar"
                    src="https://picsum.photos/id/1005/5760/3840"
                  ></b-avatar>
                </template>
                <h5 class="mt-0 mb-1">{{teacher.fullName}}</h5>
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
      teacher: null,
    }
  },
  created() {
    console.log(this.$route)
    if (this.$route.params && this.$route.params.id !== undefined) {
      this.getTeacher(this.$route.params.id)
    }
  },
  methods: {
    async getTeacher(id: String): Promise<void> {
      const response = await this.$store.dispatch('fetchTeacher', id)
      if (response) {
        this.teacher = response
      }
    },
  },
}
</script>

<style>
</style>