<template>

  <div>
    <h1 class="center">Cadastro</h1>
    <h2 class="center"></h2>

    <!-- Canceling default behavior of submit element -->
    <form @submit.prevent="savePhoto()">
      <div class="control">
        <label for="title">TÍTULO</label>
        <input id="title" autocomplete="off" v-model.lazy="photo.title">
      </div>

      <div class="control">
        <label for="url">URL</label>
        <!-- Lazy modifier only goes from view to model when input focus is off -->
        <input id="url" autocomplete="off" v-model.lazy="photo.url">
        <apic-responsive-img v-show="photo.url" :url="photo.url" :title="photo.title"/>
      </div>

      <div class="control">
        <label for="description">DESCRIÇÃO</label>
        <textarea id="description" autocomplete="off" v-model="photo.description">
        </textarea>
      </div>

      <div class="center">
        <router-link to="/"><apic-button text="VOLTAR" btype="button"/></router-link>
        <apic-button text="GRAVAR" btype="submit"/>
      </div>

    </form>
  </div>
</template>

<script>

// Components
import ResponsiveImg from '../shared/img-responsive/ResponsiveImg.vue'
import Button from '../shared/button/Button.vue';

// Classes
import Photo from '../../domain/photo/Photo';

export default {

  components: {

    'apic-responsive-img': ResponsiveImg, 
    'apic-button': Button
  },

  data() {
      return {
          photo: new Photo()
      }
  },

  methods: {
      savePhoto() {
          this.$http
            .post('http://localhost:3000/v1/fotos', this.photo)
            .then(() => this.photo = new Photo(), err => console.log(err));
      }
  }

}

</script>
<style lang="scss" scoped>

  .center {
    text-align: center;
  }
  .control {
    font-size: 1.2em;
    margin-bottom: 20px;
  }
  .control label {
    display: block;
    font-weight: bold;
    margin-bottom: .5em;
  }
 .control label + input, .control textarea {
    width: 95%;
    font-size: inherit;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: .5em;
  }

</style>