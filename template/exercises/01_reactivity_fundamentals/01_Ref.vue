<template>
  <!-- WARNING: Do not change the id of any elements., Because unit tests depend on it  -->
  <!-- TODO: Make sure that after the button is clicked, the array displayed by span is incremented correctly -->

  <!-- Document: https://vuejs.org/guide/essentials/reactivity-fundamentals.html#ref -->
  <div>
    <!-- In templates, you don't need to use count.value because refs are automatically unwrapped when used inside templates -->
    <!-- NOTICE! https://vuejs.org/guide/essentials/reactivity-fundamentals.html#caveat-when-unwrapping-in-templates -->
    <span id="d_r_s_s">count is : {{ count }}</span>

    <!-- Here you will see the "@click" symbol, don't worry, you can think of it as "onclick", which will be explained in a later section -->
    <button @click="increment" id="d_r_s_btn">click me</button>
  </div>
</template>

<script lang="ts" setup>

let count = 1;

function increment() {
  count += 1
}

</script>