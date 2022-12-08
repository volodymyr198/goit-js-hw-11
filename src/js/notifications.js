import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const emptyArrayReturn = () =>
    Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
    );
const withoutRquest = () =>
    Notify.warning('Please, enter a request in the search field!');

const messageTotalHits = totalHits =>
    Notify.success(`Hooray! We found ${totalHits} images.`);

const endOfCollection = () => {
    Notify.info('We`re sorry, but you`ve reached the end of search results.');
};

const startLoading = () => {
    Loading.pulse({
        clickToClose: true,
        svgSize: '19px',
    });
};

const stopLoading = () => Loading.remove();

const errorMessage = error => Notify.info(error.message);

export {
    emptyArrayReturn,
    withoutRquest,
    startLoading,
    stopLoading,
    messageTotalHits,
    endOfCollection,
    errorMessage,
};
