<script>
import api from './api';

export default {
    name: 'app',
    created() {
        api.get('directories/vehicle-brands').then((result) => console.log(result));
    }
}
</script>

<template>
    <div>test</div>
</template>

<style scoped></style>