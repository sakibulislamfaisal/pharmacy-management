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
      newDrug: {
        name: "",
        weight: "",
        type: "",
        vendor: "",
        price: "",
        quantity: "",
      },
      isLoading: false,
      vendors: [],
      selectedDrug: {},
      drugs: [],
    };
  },
  name: "Vendors",
  components: { TheModal, TheButton },
  async mounted() {
    setTimeout(await this.getAllDrugs(), 1000);
    setTimeout(await this.getAllVendor(), 1000);
  },

  methods: {
    async getAllDrugs() {
      this.isLoading = true;
      await privateService
        .getDrugs()
        .then((response) => {
          this.drugs = response.data;
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async getAllVendor() {
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
      this.newDrug = {
        name: "",
        weight: "",
        type: "",
        vendor: "",
        price: "",
        quantity: "",
      };
    },
    async addNewDrug() {
      this.isLoading = true;
      await privateService
        .addDrug(this.newDrug)
        .then((response) => {
          showSuccessMessage(response);
          this.addModal = false;
          this.resetForm();
          this.getAllDrugs();
          console.log(response.data);
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async removeDrug() {
      this.isLoading = true;
      await privateService
        .deleteDrug(this.selectedDrug._id)
        .then((response) => {
          showSuccessMessage(response);
          this.deleteModal = false;
          this.getAllDrugs();
          console.log(response.data);
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async updateDrug() {
      this.isLoading = true;
      await privateService
        .editDrug(this.selectedDrug)
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
    <h2 class="mt-3">All Drugs</h2>
    <TheButton @click="addModal = true">Add New Drug</TheButton>
  </div>
  <table class="mt-5">
    <thead>
      <tr>
        <th>Name</th>
        <th>Weight</th>
        <th>Type</th>
        <th>Vendor</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="drug in drugs" :key="drug.name">
        <td>
          {{ drug.name }}
        </td>
        <td>
          {{ drug.weight }}
        </td>
        <td>
          {{ drug.type }}
        </td>
        <td>
          {{ drug.vendor }}
        </td>
        <td>
          {{ drug.price }}
        </td>
        <td>
          {{ drug.quantity }}
        </td>
        <td>
          <img
            src="../assets/img/edit.png"
            alt=""
            class="action-icon"
            @click="
              selectedDrug = drug;
              updateModal = true;
            "
          />
          <img
            src="../assets/img/trash.png"
            alt=""
            class="action-icon action-icon--delete ml-3"
            @click="
              selectedDrug = drug;
              deleteModal = true;
            "
          />
        </td>
      </tr>
    </tbody>
  </table>
  <TheModal v-model="addModal" heading="Add New Vendor">
    <form @submit.prevent="addNewDrug">
      <label class="block">Select Drug Type</label>
      <div class="mt-2">
        <label>
          <input
            type="radio"
            name="drugType"
            value="Tab"
            v-model="newDrug.type"
          />
          Tab
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugType"
            value="Capsule"
            v-model="newDrug.type"
          />
          Capsule
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugType"
            value="Syrup"
            v-model="newDrug.type"
          />
          Syrup
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugType"
            value="Suppository"
            v-model="newDrug.type"
          />
          Suppository
        </label>
      </div>

      <label class="block mt-3">Drug Name</label>
      <input
        type="text"
        placeholder="Drug Name"
        class="mt-1 w-100"
        v-model="newDrug.name"
      />

      <label class="block mt-3">Weight</label>
      <input
        type="text"
        placeholder="weight in mg"
        class="mt-1 w-100"
        v-model="newDrug.weight"
      />

      <label class="block mt-3">Vendor</label>
      <select v-model="newDrug.vendor">
        <option value="">Select One</option>
        <option
          v-for="vendor in vendors"
          :key="vendor.name"
          :value="vendor.name"
        >
          {{ vendor.name }}
        </option>
      </select>

      <label class="block mt-3">Price</label>
      <input
        type="text"
        placeholder="Pack Price"
        class="mt-1 w-100"
        v-model="newDrug.price"
      />

      <label class="block mt-3">Quantity</label>
      <input
        type="number"
        placeholder="Enter Quantity"
        class="mt-1 w-100"
        v-model="newDrug.quantity"
      />

      <the-button :loading="isLoading" class="w-100 mt-4"> Add </the-button>
    </form>
  </TheModal>

  <TheModal v-model="updateModal" heading="Edit Drug">
    <form @submit.prevent="updateDrug">
      <label class="block">Select Drug Type</label>
      <div class="mt-2">
        <label>
          <input
            type="radio"
            name="drugType"
            value="Tab"
            v-model="selectedDrug.type"
          />
          Tab
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugType"
            value="Capsule"
            v-model="selectedDrug.type"
          />
          Capsule
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugType"
            value="Syrup"
            v-model="selectedDrug.type"
          />
          Syrup
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugType"
            value="Suppository"
            v-model="selectedDrug.type"
          />
          Suppository
        </label>
      </div>

      <label class="block mt-3">Drug Name</label>
      <input
        type="text"
        placeholder="Drug Name"
        class="mt-1 w-100"
        v-model="selectedDrug.name"
      />

      <label class="block mt-3">Weight</label>
      <input
        type="text"
        placeholder="weight in mg"
        class="mt-1 w-100"
        v-model="selectedDrug.weight"
      />

      <label class="block mt-3">Vendor</label>
      <select v-model="selectedDrug.vendor">
        <option value="">Select One</option>
        <option
          v-for="vendor in vendors"
          :key="vendor.name"
          :value="vendor.name"
        >
          {{ vendor.name }}
        </option>
      </select>

      <label class="block mt-3">Price</label>
      <input
        type="text"
        placeholder="Pack Price"
        class="mt-1 w-100"
        v-model="selectedDrug.price"
      />

      <label class="block mt-3">Quantity</label>
      <input
        type="number"
        placeholder="Enter Quantity"
        class="mt-1 w-100"
        v-model="selectedDrug.quantity"
      />

      <the-button :loading="isLoading" class="w-100 mt-4">
        Save Changes
      </the-button>
    </form>
  </TheModal>
  <TheModal v-model="deleteModal" heading="Are you sure?">
    <p>
      Do you really want to delete :
      <strong>{{ selectedDrug.name }}</strong>
    </p>

    <TheButton class="mt-4" @click="removeDrug" :loading="isLoading">
      Yes
    </TheButton>
    <TheButton class="ml-4" color="gray" @click="deleteModal = false">
      No
    </TheButton>
  </TheModal>
</template>

<style scoped>
table thead tr td {
  background-color: red;
  color: #fff;
}
</style>
