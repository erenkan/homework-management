<template>
  <!-- <Tutorial /> -->
  <b-container>
    <b-button variant="success" @click="increment">Increment</b-button>
    <p>Counter : {{ counter }}</p>
    <b-button variant="danger" @click="decrement">Increment</b-button>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    const message: string = 'This is a message'
    const counter: number = 0
    return {
      message,
      counter,
    }
  },

  methods: {
    async increment(): Promise<void> {
    const response = await this.$axios.get('/students')
    console.log(response);
    
    },
    decrement(): void {
      this.counter--
    },
  },
  computed: {
    count(): number {
      // ADD
      return this.counter
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