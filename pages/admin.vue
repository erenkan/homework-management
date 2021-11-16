<template>
  <b-container>
    <b-card no-body>
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img
            src="https://picsum.photos/id/2/5616/3744"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body title="Admin Dashboard">
            <hr />
            <b-row>
              <b-col>
                <b-form-group label="Students">
                  <treeselect
                    v-model="selectedStudent"
                    :multiple="false"
                    :options="studentsTree"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Teachers">
                  <treeselect
                    v-model="selectedTeacher"
                    :multiple="false"
                    :options="teachersTree"
                  />
                </b-form-group>
              </b-col>
            </b-row>
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
      selectedStudent: null,
      students: null,
      studentsTree: null,
      selectedTeacher: null,
      teachers: null,
      teachersTree: null,
    }
  },
  created(): void {
    this.getStudents()  
    this.getTeachers()
  },
  methods: {
    async getStudents(): Promise<void> {
      const response = await this.$store.dispatch('student/fetchStudents')
      if (response) {
        this.students = response
        this.studentsTree = response.map((student: { id: any; fullName: any }) => {
          return {
            id: student.id,
            label: student.fullName,
          }
        })
      }
    },
    async getTeachers(): Promise<void> {
      const response = await this.$store.dispatch('teacher/fetchTeachers')
      if (response) {
        this.teachers = response
        this.teachersTree = response.map((teacher) => {
          return {
            id: teacher.id,
            label: teacher.fullName,
            children: teacher.OwnStudents.map((child) => {
              return {
                id: child.fullName,
                label: child.fullName,
              }
            }),
          }
        })
      }
    },
  },
}
</script>

<style>
</style>