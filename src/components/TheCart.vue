<template>
  <div class="the-cart">
    <div class="the-cart__heading">Cart Items</div>

    <table>
      <tr>
        <th>Item</th>
        <th>Weight</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Total</th>
        <th>
          <img
            src="../assets/img/trash.png"
            class="action-icon action-icon--delete-small"
            alt=""
          />
        </th>
      </tr>
      <tr v-for="(item, key) in cartItems" :key="key">
        <td>{{ item.name }}</td>
        <td>{{ item.weight }}</td>
        <td>{{ item.price }}</td>

        <td>
          <input class="qty-input" type="number" v-model="item.quantity" />
        </td>

        <td class="text-right">
          {{ item.price * item.quantity }}
        </td>
        <td>
          <img
            src="../assets/img/trash.png"
            class="action-icon action-icon--delete-small"
            alt=""
            @click="removeFromCart(item._id)"
          />
        </td>
      </tr>

      <tr>
        <td colspan="6">
          <div class="text-right">
            <hr />
            <strong>Grand Total : {{ totalPrice }} </strong>
          </div>
        </td>
      </tr>
    </table>

    <TheButton
      class="w-100 mt-4"
      v-if="!enteringCustomerInfo"
      @click="enteringCustomerInfo = true"
    >
      Checkout
    </TheButton>

    <div v-if="enteringCustomerInfo" class="text-start mt-3">
      <label for="" class="">Customer Name</label>
      <input
        type="text"
        placeholder="Enter customer name"
        v-model="customer"
        class="w-100"
      />
      <label for="" class="mt-4">Customer Phone</label>
      <input
        type="text"
        placeholder="Enter customer phone"
        v-model="phone"
        class="w-100"
      />
      <TheButton class="w-100 mt-4" @click="confirmNow" :loading="confirming">
        Confirm
      </TheButton>
    </div>
  </div>
</template>

<script>
import TheButton from "./TheButton.vue";
import privateService from "../service/privateService.js";
import { showErrorMessage, showSuccessMessage } from "../utils/mesage.js";
import { useCartStore } from "../store/CartStore.js";
import { mapState, mapActions } from "pinia";

export default {
  components: { TheButton },
  data: () => ({
    phone: "",
    customer: "",
    enteringCustomerInfo: false,
    confirming: false,
  }),
  methods: {
    ...mapActions(useCartStore, {
      removeFromCart: "removeFromCart",
      clearCart: "clearCart",
    }),
    confirmNow() {
      const orderData = {
        customer: this.customer,
        phone: this.phone,
        cartItems: this.cartItems,
      };

      // console.log(orderData);
      this.confirming = true;

      privateService
        .sellDrug(orderData)
        .then((res) => {
          showSuccessMessage(res);
          this.phone = "";
          this.customer = "";
          this.enteringCustomerInfo = false;
          this.clearCart();
          this.$router.push("/dashboard/selling-history");
        })
        .catch((err) => {
          showErrorMessage(err);
        })
        .finally(() => {
          this.confirming = false;
        });
    },
  },
  computed: {
    ...mapState(useCartStore, {
      cartItems: "products",
      totalPrice: "totalPrice",
    }),
  },
};
</script>

<style>
.the-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 11px 22px;
}

.the-cart__heading {
  font-size: 25px;
  font-weight: bold;
  border-bottom: 1px solid rgb(173, 173, 173);
}

.qty-input {
  width: 50px;
  padding: 5px 7px !important;
}

.action-icon--delete-small {
  height: 14px !important;
}
</style>
