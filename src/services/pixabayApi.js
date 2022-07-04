import PropTypes from 'prop-types';

function fetchPixabayApi(imageName, page) {
  return fetch(
    `https://pixabay.com/api/?q=${imageName}&page=${page}&key=27994875-421b8ab33988d310df64bba56&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`not found ${imageName}`));
  });
}
fetchPixabayApi.PropTypes = {
  imageName: PropTypes.string,
  page: PropTypes.number,
};
const api = { fetchPixabayApi };
export default api;
