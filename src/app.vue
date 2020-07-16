<script>
import Api from "./api";
const api = new Api();

import Form from "./components/Calc.vue";
import Loader from "./components/Loader.vue";

export default {
  name: "app",
  data: () => ({
    vehicle: {},
    result: [],
    loading: false,
  }),
  components: {
    Form,
    Loader,
  },
  async created() {
    this.loading = true;
    await Promise.all([
      api.getData("directories/vehicle-categories"),
      api.getData("directories/vehicle-brands"),
      api.getData("directories/vehicle-models"),
    ])
      .then(([vehicleCategories, vehicleBrands, vehicleModels]) => {
        this.vehicle = Object.assign(
          vehicleCategories,
          vehicleBrands,
          vehicleModels
        );
      })
      .catch((e) => alert(e));
    this.loading = false;
  },
  methods: {
    async getResult(payload) {
      this.loading = true;
      this.result = [];
      await api
        .getDataWithParams("/express", payload)
        .then((r) => {
          this.result = r;
        })
        .catch((e) => alert(e.message));
      this.loading = false;
    },
  },
};
</script>

<template>
  <div>
    <div class="container">
      <div class="wrapper">
        <Loader v-show="loading" />
        <Form
          :categories="vehicle.vehicleCategories"
          :brands="vehicle.vehicleBrands"
          :models="vehicle.vehicleModels"
          @get_result="getResult"
          :result="result"
        />
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap");
body {
  margin: 0;
  font-size: 16px;
  font-weight: normal;
  font-family: "Ubuntu", sans-serif;
}
.container {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
.wrapper {
  position: relative;
  margin-top: 30px;
  width: 500px;
  height: 500px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
</style>
