<script>
import Api from "./api";
const api = new Api();

import Form from "./components/Calc.vue";

export default {
  name: "app",
  data: () => ({
    vehicle: {},
  }),
  components: {
    Form,
  },
  async created() {
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
      .catch((e) => console.log(e.message));
  },
};
</script>

<template>
  <div>
    <Form :categories="vehicle.vehicleCategories" :brands="vehicle.vehicleBrands" :models="vehicle.vehicleModels"/>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap");
body {
  font-size: 16px;
  font-weight: normal;
  font-family: "Ubuntu", sans-serif;
}
</style>
