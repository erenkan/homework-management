<template>
  <b-container v-if="student">
    <b-card no-body>
      <b-row no-gutters>
        <b-col md="3">
          <b-card-img
            src="https://picsum.photos/600/600/?image=20"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="9">
          <b-card-body>
            <b-row>
              <b-col cols="5">
                <b-media tag="li">
                  <template #aside>
                    <b-avatar href="#bar" :src="student.avatar"></b-avatar>
                  </template>
                  <h5 class="mt-0 mb-1">
                    {{ student.firstName }} {{ student.lastName }}
                  </h5>
                  <p class="mb-0">
                    You have {{ student.homeWorks.length }} homework to do.
                  </p>
                </b-media>
              </b-col>
              <b-col cols="7">
                <b-list-group
                  v-for="(homework, index) in student.homeWorks"
                  :key="index"
                >
                  <b-list-group-item
                    class="
                      d-flex
                      justify-content-between
                      align-items-center
                      mb-1
                    "
                  >
                    <span>
                      <h6 class="font-weight-bold">{{ homework.lesson }}</h6>

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
    return {}
  },
  computed: {
    student(): Record<string, any> {
      return this.$store.getters['student/getStudentById'](
        this.$route.params.id
      )
    },
  },
  methods: {},
}
</script>

<style>
</style>