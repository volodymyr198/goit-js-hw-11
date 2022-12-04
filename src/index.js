import './css/styles.css';
import ApiService from './js/api-service';

const refs = {
    formEl: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
};
const apiService = new ApiService();

const onSearchBtn = e => {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.searchQuery.value;

    apiService.resetPage();
    apiService.fetchImages();
    // console.log(searchQuery);
};
refs.formEl.addEventListener('submit', onSearchBtn);

const onLoadMore = e => {
    apiService.fetchImages(apiService.query);
    console.log(7);
};

refs.loadMoreBtn.addEventListener('click', onLoadMore);
