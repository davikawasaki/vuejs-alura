<template>
  <div>
    <!--<h1>{{ title }}</h1>-->
    <h1 v-text="title" class="center"></h1>
    <input type="search" class="filter" @input="filter = $event.target.value" placeholder="Filtre pelo título">
    <ul class="list">
      <li v-for="photo of sortedPhotos" :key="photo.key" class="item">
        <apic-pannel :title="photo.titulo">
          <div slot="img">
            <apic-responsive-img :url="photo.url" :title="photo.titulo" />
            <apic-button btype="button"
                         text="REMOVER"
                         :confirmation="true"
                         bstyle="danger"
                         @activatedButton="removePhoto($event, photo)" />
          </div>
        </apic-pannel>
      </li>
    </ul>
  </div>
</template>

<script>

import Pannel from '../shared/pannel/Pannel.vue';
import ResponsiveImg from '../shared/img-responsive/ResponsiveImg.vue';
import Button from '../shared/button/Button.vue';

export default {

  /**
   * Associated components within Home page
   * @type Object
   */
  components: {
    'apic-pannel': Pannel,
    'apic-responsive-img': ResponsiveImg,
    'apic-button': Button
  },
  
  /**
   * Binded variables
   */
  data() {
    return {
      title: 'Alura Pic with VueJS',
      photos: [],
      filter: ''
    }
  },

  /**
   * Created lifecycle to get photos list
   */
  created() {
    this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(photos => this.photos = photos, err => console.log(err));
  },

  /**
   * Component methods
   * @method sortProperty
   * @method removePhoto
   */
  methods: {

    /**
     * Sort property and return if goes before (-1), after (1) or is equal (0)
     * @param {String} prop
     */
    sortProperty(prop) {
      return(a,b) => {
        return a[prop].localeCompare(b[prop]);
      }
    },

    /**
     * Call to remove photo from API
     * @param {Object} $event (params from event broadcast)
     * @param {Object} photo
     */
    removePhoto($event, photo) {
      alert('Foto ' + photo.titulo + ' foi removida com sucesso em ' + $event + '!');
    }
  },

  /**
   * Computed methods to change data
   * @method sortedPhotos
   */
  computed: {
    sortedPhotos() {

      let photos = this.photos;

      // Filtering data according to filter input
      if(this.filter) {
        let exp = new RegExp(this.filter.trim(), 'i');
        photos = this.photos.filter(photo => exp.test(photo.titulo));
      }

      return Object.keys(photos)
        .map(p => {
          this.$set(photos[p], 'key', p)
          return photos[p]
        })
        .sort(this.sortProperty('titulo'));
    }
  }
}
</script>

<style lang="scss">
  .center {
    text-align: center;
  }
  .list {
    list-style: none;    
  }
  .list .item {
    display: inline;
  }
  .filter {
    display: block;
    width: 100%;
  }
</style>
