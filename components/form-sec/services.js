import http from '../../services/http';
const getAllCategories = () => http.get(`https://staging.mazaady.com/api/v1/get_all_cats`);
const getAllProps = (id) =>http.get(`https://staging.mazaady.com/api/v1/properties?cat=${id}`);
const getAllOptions = (id) =>http.get(`https://staging.mazaady.com/api/v1/get-options-child/${id}`);
export {
    getAllCategories,
    getAllProps,
    getAllOptions

}
