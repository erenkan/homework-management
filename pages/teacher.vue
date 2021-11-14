<template>
  <b-container v-if="teacher">
    <b-card no-body>
      <b-row no-gutters>
        <b-col md="4">
          <b-card-img
            src="https://picsum.photos/id/1/400/500"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="8">
          <b-card-body>
            <b-card-text>
              <b-media tag="li">
                <template #aside>
                  <b-avatar
                    href="#bar"
                    src="https://picsum.photos/id/1005/5760/3840"
                  ></b-avatar>
                </template>
                <h5 class="mt-0 mb-1">{{ teacher.fullName }}</h5>
                <p class="mb-0">teacher</p>
              </b-media>
              <hr />
              <div class="mt-2">
                <h5>My Students</h5>
                <treeselect
                  v-model="value"
                  :multiple="false"
                  :options="ownStudents"
                />
              </div>
              <div class="mt-5" v-if="selectedStudent">
                  


              </div>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <b-card></b-card>
  </b-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      value: null,
      teacher: null,
      ownStudents: null,
      selectedStudent: null,
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id !== undefined) {
      this.getTeacher(this.$route.params.id)
    }
  },
  methods: {
    async getTeacher(id: any): Promise<void> {
      const response = await this.$store.dispatch('fetchTeacher', id)
      console.log('get teacher',response)
      if (response) {
        this.teacher = response
        this.ownStudents = this.teacher.OwnStudents.map((a: any) => {
          return {
            id: a.id,
            label: a.fullName,
          }
        })
      }
    },
  },
}
</script>

<style>
</style>