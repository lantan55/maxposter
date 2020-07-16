<script>
export default {
  name: "Calc",
  props: ["categories", "brands", "models", "result"],
  data: () => ({
    selected: {
      category: "",
      brand: "",
      model: "",
    },
    ts: {
      filter: {
        brand: {
          id: "",
        },
        model: {
          id: "",
        },
        bodyTypes: [
          "coupe",
          "hatchback",
          "minivan",
          "pickup",
          "roadster",
          "sedan",
          "suv",
          "van",
          "universal",
          "fastback",
          "liftback",
        ],
      },
      marketFilter: {
        brand: {
          id: "",
        },
        model: {
          id: "",
        },
      },
      vehicle: {
        year: "",
        rubPrice: 0,
        ptsType: "original",
        ownerCount: 2,
        isOfficial: false,
        isOfficialByBrand: false,
        equipment: [],
        mileage: 100000,
      },
    },
    loading: false,
  }),
  computed: {
    validate() {
      const el = this.selected;
      return el.category && el.brand && el.model;
    },
    filterModels() {
      this.selected.model = "";
      if (Array.isArray(this.models)) {
        return this.models.filter((item) => {
          return (
            item.brandId === this.selected.brand &&
            item.categoryId === this.selected.category
          );
        });
      }
    },
    buyback() {
      if (this.result.length !== 0) {
        return (
          this.result.analyticsByCompletedSales.avgPrice ||
          this.result.analyticsByActualSales.avgPrice
        );
      }
    },
    rentalProfit() {
      if (this.result.length !== 0) {
        const magicNumber = 0.002;
        const currentYear = new Date().getFullYear();
        let avgYear =
          this.result.analyticsByCompletedSales.avgYear ||
          this.result.analyticsByActualSales.avgYear;
        console.group(`Расчет:`);
        console.log("avgPrice", this.buyback);
        console.log("magicNumber", magicNumber);
        console.log("currentYear", currentYear);
        console.log("avgYear", Math.floor(avgYear));
        console.log(
          "результат",
          (this.buyback * magicNumber) / (currentYear - Math.floor(avgYear))
        );
        console.groupEnd();
        return Math.floor(
          (this.buyback * magicNumber) / (currentYear - Math.floor(avgYear))
        );
      }
    },
  },
  methods: {
    sendForm() {
      this.ts.vehicle.year = this.models.filter(
        (item) => item.id === this.selected.model
      )[0].yearFrom;
      this.ts.filter.brand.id = this.ts.marketFilter.brand.id = this.selected.brand;
      this.ts.filter.model.id = this.ts.marketFilter.model.id = this.selected.model;
      this.$emit("get_result", this.ts);
    },
  },
};
</script>
<template>
  <div class="form">
    <h1>Расчет оценки выкупа и аренды ТС</h1>
    <div class="form-input">
      <label for="category">Категория</label>
      <select name="category" id="category" v-model="selected.category">
        <option v-for="(item, i) in categories" :key="i" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="form-input">
      <label for="brands">Марка</label>
      <select
        :disabled="!selected.category"
        name="brands"
        id="brands"
        v-model="selected.brand"
      >
        <option v-for="(item, i) in brands" :key="i" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="form-input">
      <label for="models">Марка</label>
      <select
        :disabled="!selected.brand"
        name="models"
        id="models"
        v-model="selected.model"
      >
        <option v-for="(item, i) in filterModels" :key="i" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="form-input">
      <button ref="send" @click.prevent="sendForm" :disabled="!validate">
        Рассчитать
      </button>
    </div>
    <h2>Результат:</h2>
    <div class="result">
      <div class="buyback">
        стоимость выкупа:
        <span>{{ buyback | currency }}</span>
      </div>
      <div class="profit">
        доход от аренды в день:
        <span>{{ rentalProfit | currency }}</span>
      </div>
    </div>
  </div>
</template>

<style module>
.form {
  padding: 40px 25px 25px 25px;
}
.form h1 {
  font-size: 1.5em;
  font-weight: normal;
}
.form h2 {
  font-size: 1em;
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
.form .form-input button:focus,
.form .form-input button:active {
  outline: none;
}
.form .form-input button:disabled {
  background-color: #bdbdbd;
  color: #ffffff;
}

.form .result {
  padding: 15px;
  background: #eeeeee;
}
.form .result div {
  font-size: 0.9em;
}
.form .result span {
  font-size: 1em;
  font-weight: bold;
}
</style>
