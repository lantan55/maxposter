<script>
import Api from "./api";
const api = new Api();

export default {
  name: "app",
  data: () => ({
    vehicle: {},
  }),
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
  <div>test</div>
</template>

<style scoped></style>
