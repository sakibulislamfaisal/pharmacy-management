<script>
import TheButton from "../components/TheButton.vue";
import TheModal from "../components/TheModal.vue";
import { showSuccessMessage, showErrorMessage } from "../utils/mesage.js";
import privateService from "../service/privateService.js";

export default {
  data() {
    return {
      addModal: false,
      deleteModal: false,
      updateModal: false,
      newVendor: {
        name: "",
        description: "",
      },
      isLoading: false,
      vendors: [],
      selectedVendor: {},
    };
  },
  name: "Vendors",
  components: { TheModal, TheButton },
  async mounted() {
    await this.getVendors();
  },
  methods: {
    async getVendors() {
      this.isLoading = true;
      await privateService
        .getVendors()
        .then((response) => {
          this.vendors = response.data;
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    resetForm() {
      this.newVendor = {
        name: "",
        description: "",
      };
    },
    async addNewVendor() {
      if (this.newVendor.name.length < 2) {
        showErrorMessage("Name must be at least 2 characters");
        return;
      }

      this.isLoading = true;
      await privateService
        .addVendor(this.newVendor)
        .then((response) => {
          showSuccessMessage(response);
          this.addModal = false;
          this.resetForm();
          this.getVendors();
          console.log(response.data);
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async deleteVendor() {
      this.isLoading = true;
      await privateService
        .deleteVendor(this.selectedVendor._id)
        .then((response) => {
          showSuccessMessage(response);
          this.deleteModal = false;
          this.getVendors();
          console.log(response.data);
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async editVendor() {
      this.isLoading = true;
      await privateService
        .editVendor(this.selectedVendor._id, this.selectedVendor)
        .then((response) => {
          showSuccessMessage(response);
          this.updateModal = false;

          console.log(response.data);
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<template>
  <div class="d-flex jc-between ai center">
    <h2 class="mt-3">All Vendors</h2>
    <TheButton @click="addModal = true">Add New</TheButton>
  </div>
  <table class="mt-5">
    <thead>
      <tr>
        <td>Name</td>
        <td>Description</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vendor in vendors" :key="vendor.name">
        <td>{{ vendor.name }}</td>
        <td>{{ vendor.description }}</td>
        <td>
          <img
            src="../assets/img/edit.png"
            alt=""
            class="action-icon"
            @click="
              selectedVendor = vendor;
              updateModal = true;
            "
          />
          <img
            src="../assets/img/trash.png"
            alt=""
            class="action-icon action-icon--delete ml-3"
            @click="
              selectedVendor = vendor;
              deleteModal = true;
            "
          />
        </td>
      </tr>
    </tbody>
  </table>
  <TheModal v-model="addModal" heading="Add New Vendor">
    <form @submit.prevent="addNewVendor">
      <label for="Vendor Name" class="block">Vendor Name</label>
      <input
        type="text"
        placeholder="Enter Vendor Name"
        required
        v-model="newVendor.name"
        class="mt-2 w-100"
      />
      <label for="Vendor Name" class="block mt-2">Vendor Description</label>
      <input
        type="text"
        placeholder="Enter Vendor Description"
        required
        v-model="newVendor.description"
        class="mt-2 w-100"
      />
      <TheButton class="w-100 mt-4" :loading="isLoading">Submit</TheButton>
    </form>
  </TheModal>
  <TheModal v-model="deleteModal" heading="Are you sure?">
    <p>
      Do you really want to delete :
      <strong>{{ selectedVendor.name }}</strong>
    </p>

    <TheButton class="mt-4" @click="deleteVendor" :loading="isLoading">
      Yes
    </TheButton>
    <TheButton class="ml-4" color="gray" @click="deleteModal = false">
      No
    </TheButton>
  </TheModal>

  <TheModal v-model="updateModal" heading="Edit vendor">
    <form @submit.prevent="editVendor">
      <label class="block">Vendor Name</label>
      <input
        type="text"
        placeholder="Enter vendor name"
        class="mt-1 w-100"
        required
        v-model="selectedVendor.name"
      />

      <label class="block mt-3">Description</label>
      <input
        type="text"
        placeholder="Write short description"
        class="mt-1 w-100"
        required
        v-model="selectedVendor.description"
      />

      <the-button :loading="isLoading" class="w-100 mt-4">
        Save Changes
      </the-button>
    </form>
  </TheModal>
</template>

<style scoped>
table thead tr {
  background-color: #a7a097;
  color: #fff;
}
</style>
