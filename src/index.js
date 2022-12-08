import './css/styles.css';
import ApiService from './js/api-service';
import { markup } from './js/markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { smoothScroll } from './js/smooth-scroll';
import * as notification from './js/notifications';

const refs = {
    formEl: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.btn'),
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
    try {
        apiService.query = e.currentTarget.elements.searchQuery.value.trim();

        apiService.resetPage();
        await apiService.fetchImages().then(({ hits, totalHits }) => {
            if (apiService.query === '') {
                refs.gallery.innerHTML = '';
                hiddenLoadMoreBtn();
                return notification.withoutRquest();
            }

            if (hits.length === 0) {
                refs.gallery.innerHTML = '';
                hiddenLoadMoreBtn();
                return notification.emptyArrayReturn();
            }

            refs.gallery.innerHTML = '';

            notification.startLoading();
            refs.gallery.insertAdjacentHTML('beforeend', markup(hits));
            notification.stopLoading();
            notification.messageTotalHits(totalHits);
            uncoverLoadMoreBtn();

            if (totalHits - refs.gallery.children.length < 40) {
                notification.endOfCollection();
                hiddenLoadMoreBtn();
            }
        });
        lightbox.refresh();
    } catch (error) {
        notification.errorMessage(error);
    }
};
refs.formEl.addEventListener('submit', onSearchBtn);

const onLoadMore = async e => {
    try {
        await apiService.fetchImages().then(({ hits, totalHits }) => {
            if (totalHits - refs.gallery.children.length < 40) {
                notification.endOfCollection();
                hiddenLoadMoreBtn();
            }
            notification.startLoading();
            refs.gallery.insertAdjacentHTML('beforeend', markup(hits));
            notification.stopLoading();
            smoothScroll(refs.gallery);
        });
        lightbox.refresh();
    } catch (error) {
        notification.errorMessage(error);
    }
};
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function uncoverLoadMoreBtn() {
    refs.loadMoreBtn.classList.remove('is-hidden');
}

function hiddenLoadMoreBtn() {
    refs.loadMoreBtn.classList.add('is-hidden');
}
