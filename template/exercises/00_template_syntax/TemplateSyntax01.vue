<template>
  <!-- WARNING: Do not change span id, Because unit tests depend on it  -->
  <span id="template_syntax_01">
    <!-- TODO: Render the `greeting` variable using template syntax-->
    <!-- Make sure to reference the ref variable `greeting` -->
    Hello World
  </span>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const greeting = ref("HELLO WORLD!")
</script>
