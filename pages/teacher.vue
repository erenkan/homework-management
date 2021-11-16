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
                  <b-avatar href="#bar" :src="teacher.avatar"></b-avatar>
                </template>
                <h5 class="mt-0 mb-1">
                  {{ teacher.firstName }} {{ teacher.lastName }}
                </h5>
                <p class="mb-0">teacher</p>
              </b-media>
              <hr />
              <div class="mt-2">
                <h5>My Students</h5>
                <treeselect
                  v-model="selectedStudent"
                  :multiple="false"
                  :options="ownStudentsList"
                  @select="selectStudent"
                />
              </div>
              <hr v-if="student" />
              <div class="mt-5" v-if="student">
                <div class="d-flex justify-content-between mb-2">
                  <h5>{{ student.firstName }} {{ student.lastName }}</h5>
                  <b-button
                    variant="outline-success"
                    size="sm"
                    v-b-modal.modal-prevent-closing
                    >Assign New</b-button
                  >
                </div>
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
                  </b-list-group-item>
                </b-list-group>
              </div>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>

      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Submit Your Homework"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Lesson" label-for="name-input">
            <b-form-input
              id="lesson-input"
              v-model="homeWorkPayload.lesson"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Description" label-for="name-input">
            <b-form-input
              id="description-input"
              v-model="homeWorkPayload.description"
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </b-card>
  </b-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      teacher: {} as Record<string, any>,
      teacherCopy: {} as Record<string, any>,
      ownStudentsList: [] as Record<string, any>[],
      selectedStudent: null as unknown,
      student: null,
      homeWorkPayload: {
        lesson: null,
        description: null,
        dueDate: null,
        status: true,
        isDone: false,
        isOverdue: false,
      } as Record<string, any>,
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
        this.teacherCopy = response
        console.log('this.teacher', this.teacher)
        this.ownStudentsList = this.teacher.ownStudents.map((a: any) => {
          return {
            id: a.id,
            label: `${a.firstName} ${a.lastName}`,
          }
        })
      }
    },
    selectStudent(node: { id: any }): void {
      this.student = this.teacher.ownStudents.find((b: any) => b.id === node.id)
    },
    resetModal() {
      this.homeWorkPayload.lesson = null
      this.homeWorkPayload.description = null
    },
    handleOk(bvModalEvt: { preventDefault: () => void }) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    async handleSubmit() {
      // Push the name to submitted names
      let modifiedOwnStudents = this.teacherCopy.ownStudents.map((a: any) => {
        if (a.id === this.selectedStudent) {
          a.homeWorks.push(this.homeWorkPayload)
        }
        return a
      })
      console.log('modifiedOwnStudents', modifiedOwnStudents)

      // let payload = {
      //   homeWork: this.homeWorkPayload,
      //   teacherId: this.teacher.id,
      // }
      // const response = await this.$store.dispatch(
      //   'teacher/createHomeWork',
      //   payload
      // )
      // console.log('response', response)
      // Hide the modal manually
      this.$nextTick(() => { 
        this.$bvModal.hide('modal-prevent-closing')
      })
    },
  },
}
</script>

<style>
</style>