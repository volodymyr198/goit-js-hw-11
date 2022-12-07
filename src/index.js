import './css/styles.css';
import ApiService from './js/api-service';
import { markup } from './js/markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    formEl: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
};
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    animationSpeed: 400,
    captionDelay: 250,
});
const apiService = new ApiService();

const onSearchBtn = async e => {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.searchQuery.value.trim();

    if (apiService.query === '') {
        return alert('please, enter a request!');
    }

    apiService.resetPage();
    await apiService.fetchImages().then(hits => {
        console.log(hits);
        console.log(hits.length);

        if (hits === [] || hits.length === 0) {
            return alert(
                'Sorry, there are no images matching your search query. Please try again.'
            );
        }

        refs.gallery.innerHTML = '';
        refs.gallery.innerHTML = markup(hits);
    });
    lightbox.refresh();
};
refs.formEl.addEventListener('submit', onSearchBtn);

const onLoadMore = async e => {
    await apiService.fetchImages().then(hits => {
        if (hits === [] || hits.length === 0) {
            return alert(
                'Sorry, there are no images matching your search query. Please try again.'
            );
        }
        refs.gallery.insertAdjacentHTML = ('beforeend', markup(hits));
    });
    lightbox.refresh();
};

refs.loadMoreBtn.addEventListener('click', onLoadMore);
