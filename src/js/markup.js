export const markup = hits => {
    return hits
        .map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads,
            }) => {
                return `
    <div class="photo-card">
        <div class="photo-box">
            <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" width=320px/>
            </a>
        </div>
        <div class="info-box">
            <p class="info__item">
                <b>Likes:</b> ${likes}
            </p>
            <p class="info-box__item">
                <b>Views:</b> ${views}
            </p>
            <p class="info-box__item">
                <b>Comments:</b> ${comments}
            </p>
            <p class="info-box__item">
                <b>Downloads:</b> ${downloads}
            </p>
        </div>
    </div>
`;
            }
        )
        .join('');
};
