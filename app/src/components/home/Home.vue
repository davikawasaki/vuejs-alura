<template>
  <div>
    <!--<h1>{{ title }}</h1>-->
    <h1 v-text="title" class="center"></h1>
    <p v-show="message" class="center message">{{ message }}</p>
    <input type="search" class="filter" @input="filter = $event.target.value" placeholder="Filtre pelo título">
    <ul class="list">
      <li v-for="photo of sortedPhotos" :key="photo.key" class="item">
        <apic-pannel :title="photo.title">
          <div slot="img">
            <!-- <apic-responsive-img v-apic-transform="{ increment: 15, animate: true }" :url="photo.url" :title="photo.title" /> -->
            <!-- Argument rotate with modifiers animate and reverse -->
            <!-- <apic-responsive-img v-apic-transform:rotate.animate.reverse="15" :url="photo.url" :title="photo.title" /> -->
            <apic-responsive-img v-apic-transform:scale.animate="1.1" :url="photo.url" :title="photo.title" />
            <router-link :to="{ name: 'update', params: { id: photo._id } }">
              <apic-button btype="button" text="ALTERAR" />
            </router-link>
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

// Components
import Pannel from '../shared/pannel/Pannel.vue';
import ResponsiveImg from '../shared/img-responsive/ResponsiveImg.vue';
import Button from '../shared/button/Button.vue';

// Directives
import Transform from '../../directives/Transform';

// Services
import PhotoService from '../../domain/photo/PhotoService';

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
   * Associated directives within Home page
   * @type Object
   */
  directives: {
    'apic-transform': Transform
  },
  
  /**
   * Binded variables
   */
  data() {
    return {
      title: 'Alura Pic with VueJS',
      photos: [],
      filter: '',
      message: ''
    }
  },

  /**
   * Created lifecycle to get photos list
   */
  created() {

    this.service = new PhotoService(this.$resource);
    
    // Ajax Request with Photo exclusive service list method
    this.service
      .list()
      .then(photos => this.photos = photos, err => this.message = err.message );
    
    // Ajax Request with $resource
    // this.resource = this.$resource('v1/fotos{/id}');
    // this.resource.query()
    //   .then(res => res.json())
    //   .then(photos => this.photos = photos, err => console.log(err));

    // Ajax Request with $http
    // this.$http.get('v1/fotos')
    //   .then(res => res.json())
    //   .then(photos => this.photos = photos, err => console.log(err));
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

      // Ajax Request with Photo exclusive service delete method
      this.service
        .delete(photo._id)
        .then(() => {
            let index = this.photos.indexOf(photo);
            this.photos.splice(index, 1);
            this.message = 'Foto removida com sucesso!';
          }, err => this.message = err.message );

      // Ajax Request with $resource
      // this.resource
      //   .delete({ id: photo._id })
      //   .then(() => {
      //       let index = this.photos.indexOf(photo);
      //       this.photos.splice(index, 1);
      //       this.message = 'Foto removida com sucesso!';
      //     }, err => {
      //       console.log(err);
      //       this.message = 'Não foi possível remover a foto!';
      //     }
      //   );

      // Ajax Request with $http
      // this.$http
      //   .delete(`v1/fotos/${photo._id}`)
      //   .then(() => {
      //       let index = this.photos.indexOf(photo);
      //       this.photos.splice(index, 1);

      //       this.message = 'Foto removida com sucesso!';
      //     }, err => {
      //       console.log(err);
      //       this.message = 'Não foi possível remover a foto!';
      //     }
      //   );
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
        photos = this.photos.filter(photo => exp.test(photo.title));
      }

      return Object.keys(photos)
        .map(p => {
          this.$set(photos[p], 'key', p)
          return photos[p]
        })
        .sort(this.sortProperty('title'));
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
  p.message {
    color: firebrick;
    font-weight: bold;
  }
</style>
