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
                .then(res => res.json());
    }

    /**
     * Register a new photo in API database.

     * @param {Photo} photo 
     * @return {Promise} promise
     */
    register(photo) {
        return this._resource
                .save(photo);
    }

    /**
     * Delete a registered photo from API database.
     * 
     * @param {Long} id 
     * @return {Promise} promise
     */
    delete(id) {
        return this._resource.delete({ id });
    }

}