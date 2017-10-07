<template>
  <section class="body">
    <!--<h1>{{ title }}</h1>-->
    <h1 v-text="title" class="center"></h1>
    <ul class="list">
      <li v-for="photo of photos" :key="photo.titulo" class="item">
        <apic-pannel :title="photo.titulo">
          <div slot="img">
            <img :src="photo.url" :alt="photo.titulo" class="img-responsive" />
          </div>
        </apic-pannel>
      </li>
    </ul>
  </section>
</template>

<script>
import Pannel from './components/shared/pannel/Pannel.vue'

export default {
  components: {
    'apic-pannel': Pannel
  },
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
  /* Main */ 
  .body {
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  }
  .center {
    text-align: center;
  }
  .list {
    list-style: none;    
  }
  .list .item {
    display: inline;
  }
  .img-responsive {
    width: 100%;
  }
</style>
