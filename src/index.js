import Vue from 'vue';
import App from './app.vue'

import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(VueCurrencyFilter, {
    symbol : 'руб',
    thousandsSeparator: ' ',
    fractionCount: 2,
    fractionSeparator: ',',
    symbolPosition: 'back',
    symbolSpacing: true
})

new Vue({
    el: '#app',
    render: h => h(App)
})