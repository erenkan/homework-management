<template>
  <b-container v-if="admin">
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
            <b-media tag="li">
              <template #aside>
                <b-avatar href="#bar" :src="admin.avatar"></b-avatar>
              </template>
              <h5 class="mt-0 mb-1">
                {{ admin.name }}
              </h5>
              <p class="mb-0">Admin</p>
            </b-media>
            <hr />
            <b-row>
              <b-col>
                <b-form-group label="Students">
                  <treeselect
                    v-model="selectedStudent"
                    :multiple="false"
                    :options="studentList"
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
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      selectedStudent: null,
      selectedTeacher: null,
    }
  },
  computed: {
    ...mapGetters({
      teachers: 'teacher/teachers',
      studentList: 'student/studentsList',
    }),
    teachersTree(): any {
      return this.$store.getters['teacher/teachers'].map((teacher: any) => {
        return {
          label: `${teacher.firstName} ${teacher.lastName}`,
          id: teacher.id,
          children: teacher.ownStudents.map((student: any) => {
            return {
              label: `${student.firstName} ${student.lastName}`,
              id: `${student.id}_${student.firstName}`,
            }
          }),
        }
      })
    },
    admin(): any {
      return this.$store.getters['admin'][0]
    },
  },
  created(): void {
    this.getTeachers()
    this.getStudents()
  },
  methods: {
    getStudents(): void {
      this.$store.dispatch('student/getStudents')
    },
    getTeachers(): void {
      this.$store.dispatch('teacher/getTeachers')
    },
  },
}
</script>

<style>
</style>