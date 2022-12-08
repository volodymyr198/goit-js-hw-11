export function smoothScroll(gallery) {
    const { height: cardHeight } =
        gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 1,
        behavior: 'smooth',
    });
}
