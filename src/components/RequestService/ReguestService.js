const axios = require('axios');
const BASE_URL = 'https://pixabay.com/api/?';

export class ImagesLoadService {
  constructor() {
    this.searchImages = '';
    this.page = 1;
    this.imagesAmount = 12;
  }

  normalizeResponse(response) {
    const filteredHits = response.hits.map(
      ({ id, largeImageURL, tags, webformatURL }) => {
        return { id, largeImageURL, tags, webformatURL };
      }
    );
    return { total: response.total, hits: filteredHits };
  }

  async requestImages() {
    const response = await axios(`${BASE_URL}`, {
      params: {
        key: '29684807-93441b9500ca74c45f98c22c3',
        q: this.searchImages,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: this.imagesAmount,
        page: this.page,
      },
    });

    if (response.data.total === 0) {
      return Promise.reject(
        new Error(`There are no images for query '${this.searchImages}'!`)
      );
    }
    const normalizedResponse = this.normalizeResponse(response.data);
    this.incrementPage();
    return normalizedResponse;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchImages;
  }

  set query(newImages) {
    this.searchImages = newImages;
  }
}
