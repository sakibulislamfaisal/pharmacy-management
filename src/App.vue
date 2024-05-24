<script>
import TheToast from "./components/TheToast.vue";
import { eventBus } from "../src/utils/eventBus.js";
export default {
  data() {
    return {
      toasts: [
        // {
        //   type: "Success",
        //   message: "Done Successfully!",
        // },
        // {
        //   type: "Error",
        //   message: "Something went wrong!",
        // },
      ],
    };
  },
  methods: {
    TimeOutToast() {
      setTimeout(() => {
        this.toasts.shift();
      }, 2000);
    },
  },
  //event emit listeners
  mounted() {
    eventBus.on("toast", (data) => {
      this.toasts.push(data);
      this.TimeOutToast();
    });
  },
  watch: {},
  computed: {},
  components: {
    TheToast,
  },
};
</script>

<template>
  <router-view></router-view>

  <TransitionGroup name="list" tag="div" class="toasts">
    <TheToast
      v-for="(toast, i) in toasts"
      :key="i"
      :toastType="toast.type"
      :message="toast.message"
    ></TheToast>
  </TransitionGroup>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
