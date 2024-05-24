<script>
import TheButton from "../../components/TheButton.vue";
import privateService from "../../service/privateService.js";
import { showErrorMessage, showSuccessMessage } from "../../utils/mesage.js";

export default {
  data: () => ({
    getting: true,
    saving: false,
    accountSettings: {
      fullName: "",
      email: "",
      phone: "",
    },
  }),

  methods: {
    getAccountSettings() {
      this.getting = true;
      privateService
        .getAccountSettings()
        .then((res) => {
          if (res.data.fullName) {
            this.accountSettings = res.data;
          }
        })
        .catch((e) => {
          showErrorMessage(e);
        })
        .finally(() => {
          this.getting = false;
        });
    },

    saveData() {
      this.saving = true;
      privateService
        .updateAccountSettings(this.accountSettings)
        .then((res) => {
          showSuccessMessage(res);
        })
        .catch((err) => {
          showErrorMessage(err);
        })
        .finally(() => {
          this.saving = false;
        });
    },
  },
  components: {
    TheButton,
  },

  mounted() {
    setTimeout(this.getAccountSettings, 333);
  },
};
</script>

<template>
  <div class="pt-3">
    <div class="text-center" v-if="getting">Loading...</div>
    <div v-else>
      <label class="text-start m-2">Full Name</label>
      <input
        type="text"
        v-model="accountSettings.fullName"
        style="width: 300px"
        class="border-2 border-gray-300 p-2"
        placeholder="Full Name"
      />
      <label class="text-start m-2">Email</label>
      <input
        type="text"
        v-model="accountSettings.email"
        style="width: 300px"
        class="border-2 border-gray-300 p-2"
        placeholder="Email address"
      />
      <label class="text-start m-2">Phone</label>
      <input
        type="text"
        v-model="accountSettings.phone"
        placeholder="Contact "
      />
      <br />
      <TheButton class="inline-block mt-4" :loading="saving" @click="saveData">
        Save
      </TheButton>
    </div>
  </div>
</template>

<style scoped></style>
