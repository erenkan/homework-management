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
                  v-model="selectedStudent"
                  :multiple="false"
                  :options="ownStudents"
                  @select="selectStudent"
                />
              </div>
              <hr v-if="student" />
              <div class="mt-5" v-if="student">
                <h5>
                  {{ student.fullName }}
                </h5>
                <b-list-group
                  v-for="(homework, index) in student.homeWorks"
                  :key="index"
                >
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {{ homework.description }}
                    </span>
                    <div>
                      <b-badge variant="success" pill v-if="homework.isDone"
                        >Done</b-badge
                      >
                      <b-badge
                        variant="warning"
                        pill
                        v-if="
                          !homework.isDone &&
                          !homework.isOverdue &&
                          homework.status
                        "
                        >Pending</b-badge
                      >
                      <b-badge variant="danger" pill v-if="homework.isOverdue"
                        >Overdue</b-badge
                      >
                      <b-badge
                        variant="info"
                        pill
                        v-if="
                          !homework.isOverdue &&
                          !homework.status &&
                          !homework.isDone
                        "
                        >Cancelled</b-badge
                      >
                    </div>

                    <!-- <b-badge variant="primary" pill>{{ home }}</b-badge> -->
                  </b-list-group-item>
                </b-list-group>
              </div>
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
      teacher: {} as object,
      ownStudents: null,
      selectedStudent: null,
      student: null,
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id !== undefined) {
      this.getTeacher(this.$route.params.id)
    }
  },
  methods: {
    async getTeacher(id: any): Promise<void> {
      const response = await this.$store.dispatch('teacher/fetchTeacher', id)
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
    selectStudent(node: object) {
      this.student = this.teacher.OwnStudents.find((b: any) => b.id === node.id)
    },
  },
}
</script>

<style>
</style>