<template>

  <div>
    <h1 v-if="!photo._id" class="center">Cadastro - Nova foto</h1>
    <h1 v-else class="center">Cadastro - Alterando foto</h1>

    <p v-show="message" class="center message">{{ message }}</p>

    <!-- Canceling default behavior of submit element -->
    <form @submit.prevent="save()">
      <div class="control">
        <label for="title">TÍTULO *</label>
        <input v-validate data-vv-rules="required|min:3|max:30" data-vv-as="título"
               name="title" id="title" autocomplete="off" v-model.lazy="photo.title">
        <p v-show="errors.has('title')" class="error">{{ errors.first('title') }}</p>
      </div>

      <div class="control">
        <label for="url">URL *</label>
        <!-- Lazy modifier only goes from view to model when input focus is off -->
        <input v-validate data-vv-rules="required" name="url" id="url" autocomplete="off" v-model.lazy="photo.url">
        <p v-show="errors.has('url')" class="error">{{ errors.first('url') }}</p>
        <apic-responsive-img v-show="photo.url" :url="photo.url" :title="photo.title"/>
      </div>

      <div class="control">
        <label for="description">DESCRIÇÃO</label>
        <textarea id="description" autocomplete="off" v-model="photo.description">
        </textarea>
      </div>

      <div class="center">
        <router-link :to="{ name: 'home' }"><apic-button text="VOLTAR" btype="button"/></router-link>
        <apic-button text="GRAVAR" btype="submit"/>
      </div>

    </form>
  </div>
</template>

<script>

// Components
import ResponsiveImg from '../shared/img-responsive/ResponsiveImg.vue'
import Button from '../shared/button/Button.vue';

// Services
import PhotoService from '../../domain/photo/PhotoService';

// Classes
import Photo from '../../domain/photo/Photo';

export default {

  components: {

    'apic-responsive-img': ResponsiveImg, 
    'apic-button': Button
  },

  data() {
      return {
          photo: new Photo(),
          id: this.$route.params.id,
          message: ''
      }
  },

  created() {
    this.service = new PhotoService(this.$resource);

    // Check if it's a photo update
    if(this.id) {
      this.service
        .search(this.id)
        .then(photo => this.photo = photo, err => this.message = err.message);
    }

    // Ajax Request with $resource
    // this.resource = this.$resource('v1/fotos');
  },

  methods: {
      save() {
        // Check input fields validation before saving/updating
        this.$validator
          .validateAll()
          .then(success => {
            if(success) {
              // Ajax Request with Photo exclusive service register method
              this.service
                .register(this.photo)
                .then(() => {
                  // After updating photo
                  if(this.id) this.$router.push({ name: 'home' });
                  // After creating new photo
                  this.photo = new Photo();
                }, err => this.message = err.message);  
            } else this.message = "Preencha os campos obrigatórios para prosseguir!";
          })

        // Ajax Request with $resource
        // this.resource
        //   .save(this.photo)
        //   .then(() => this.photo = new Photo(), err => console.log(err));

        // Ajax Request with $http
        // this.$http
        //   .post('v1/fotos', this.photo)
        //   .then(() => this.photo = new Photo(), err => console.log(err));
      }
  }

}

</script>
<style lang="sass" scoped>
  @import './Register.scss';
</style>