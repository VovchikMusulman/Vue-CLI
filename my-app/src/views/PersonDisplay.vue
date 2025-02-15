<template>
  <div id="person">
    <div>{{ person.name }}</div>
    <div>{{ person.surname }}</div>
  </div>
</template>

<script>
export default {
  name: 'PersonDisplay',
  props: {
    person: {
      name: String,
      surname: String
    }
  }
}
</script>

<style>
#person {
  font-family: Verdana;
}
</style>