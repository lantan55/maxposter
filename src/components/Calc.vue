<script>
export default {
  name: "Calc",
  props: ["categories", "brands", "models"],
  data: () => ({
    selected: {
      category: [],
      brand: [],
      model: [],
    },
  }),
  computed: {
    filterModels() {
      if (Array.isArray(this.models)) {
        return this.models.filter((item) => {
          return (
            item.brandId === this.selected.brand.id &&
            item.categoryId === this.selected.category.id
          );
        });
      }
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="form">
      <h1>Расчет оценки выкупа и аренды ТС</h1>
      <div class="form-input">
        <label for="category">Категория</label>
        <select name="category" id="category" v-model="selected.category">
          <option v-for="(item, i) in categories" :key="i" :value="item">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="form-input">
        <label for="brands">Марка</label>
        <select name="brands" id="brands" v-model="selected.brand">
          <option v-for="(item, i) in brands" :key="i" :value="item">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="form-input">
        <label for="models">Марка</label>
        <select name="models" id="models" v-model="selected.model">
          <option v-for="(item, i) in filterModels" :key="i" :value="item">
            {{ item.name }}
          </option>
        </select>
      </div>

      <div class="form-input">
        <button>Рассчитать</button>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  justify-content: center;
}
.form {
  margin-top: 45px;
  padding: 25px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.form h1 {
  font-size: 1.5em;
  font-weight: normal;
}
.form .form-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.form .form-input:last-child {
  margin-bottom: 0;
}
.form .form-input select {
  margin-top: 3px;
  width: 100%;
  height: 30px;
  cursor: pointer;
}
.form .form-input option {
  font-size: 1.2em;
}
.form .form-input button {
  padding: 5px 15px;
  align-self: center;
  width: 150px;
  height: 30px;
  background-color: #00c853;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.form .form-input button:disabled {
  background-color: #bdbdbd;
  color: #ffffff;
}
</style>
