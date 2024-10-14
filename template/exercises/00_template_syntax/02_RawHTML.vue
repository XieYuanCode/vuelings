<template>
  <!-- WARNING: Do not change the id of element span, Because unit tests depend on it  -->
  <!-- TODO: Render the `raw_htmlString` variable using directive: v-html -->
  <!-- Make sure HELLO WORLD! is red -->

  <!-- Document: https://vuejs.org/guide/essentials/template-syntax.html#raw-html -->
  <span id="raw_html">
    {{ raw_htmlString }}
  </span>
</template>

<script lang="ts" setup>
const raw_htmlString = `<p id="raw_html_p" color="red">HELLO WORLD!</p>`
</script>
