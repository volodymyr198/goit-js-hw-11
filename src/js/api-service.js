import axios from 'axios';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
        this.keyIp = '31814066-d36b2cc87cac42beedbbff451';
        this.baseUrl =
            'https://pixabay.com/api/?image_type=photo&orientation=horizontal&safesearch=true';
    }
    async fetchImages() {
        const url = `${this.baseUrl}&key=${this.keyIp}&q=${this.searchQuery}&per_page=${this.per_page}&page=${this.page}`;
        const response = await axios.get(url);

        const { data } = await response;
        this.page += 1;

        return data;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
