export default class PhotoService {

    constructor(resource) {
        // Private resource attribute
        this._resource = resource('v1/fotos{/id}');
    }

    /**
     * List photos from API.
     * 
     * Query method from vue-resource returns a promise,
     * which contains a hardcoded response that needs to be converted to json.
     * After json conversion, the return has a promise to be accepted or rejected
     * whenever it's called.
     * 
     * @return {Promise} promise
     */
    list() {
        return this._resource
                .query()
                .then(res => res.json(), err => {
                    console.log(err);
                    throw new Error('Não foi possível carregar as fotos! Tente mais tarde.');
                });
    }

    /**
     * Register a new photo or update it in API database.

     * @param {Photo} photo 
     * @return {Promise} promise
     */
    register(photo) {
        // If photo has id, it does a update on the photo
        if(photo._id) {
            return this._resource
                .update({ id: photo._id }, photo)
                .then(null, err => {
                    console.log(err);
                    throw new Error('Não foi possível atualizar a foto! Tente mais tarde.');
                });
        }
        // When it doesn't have an id, register a new photo
        else {
            return this._resource
                .save(photo)
                .then(null, err => {
                    console.log(err);
                    throw new Error('Não foi possível salvar a nova foto! Tente mais tarde.');
                });
        }
    }

    /**
     * Delete a registered photo from API database.
     * 
     * @param {Long} id 
     * @return {Promise} promise
     */
    delete(id) {
        return this._resource
            .delete({ id })
            .then(null, err => {
                console.log(err);
                throw new Error('Não foi possível remover a foto! Tente mais tarde.');
            });
    }

    /**
     * Search for a photo in API database through its respective id.
     * 
     * @param {Long} id 
     * @return {Promise} promise
     */
    search(id) {
        return this._resource
            .get({ id })
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não é possível editar a foto! Tente mais tarde.');
            });
    }

}