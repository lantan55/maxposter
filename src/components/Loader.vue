<script>
export default {
  name: "loader",
};
</script>

<template>
  <div class="loading">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<style module>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
  opacity: 0.5;
  z-index: 999;
}
.lds-dual-ring {
  display: inline-block;
  width: 40px;
  height: 40px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 32px;
  height: 32px;
  margin: 0;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #c62828 transparent #c62828 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
