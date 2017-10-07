<template>
  <section>
    <!--<h1>{{ title }}</h1>-->
    <h1 v-text="title"></h1>
    <ul>
      <li v-for="photo of photos" :key="photo.title">
        <img :src="photo.url" :alt="photo.title" />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: 'Alura Pic with VueJS',
      photos: []
    }
  },
  created() {
    this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(photos => this.photos = photos, err => console.log(err));
  }
}
</script>

<style lang="scss">

</style>
