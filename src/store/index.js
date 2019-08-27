import { decorate, observable, action } from 'mobx';
import axios from 'axios';

class Store {
  stories = [];
  error = null;
  loading = true;
  api = 'https://hacker-news.firebaseio.com/v0/topstories.json';
  ids = {
    all: [],
    gap: 5,
    start: 0
  };

  setLoading(value) {
    if (typeof value === 'boolean') {
      this.loading = value;
    }
  }

  setError(value) {
    this.error = value;
  }

  loadIds() {
    this.setLoading(true);
    axios
      .get(this.api)
      .then(result => {
        this.ids.all = result.data;
      })
      .then(() => this.fetchStories())
      .catch(error => {
        this.setError(error);
        throw error;
      });
    this.setLoading(false);
  }

  fetchStories() {
    this.setLoading(true);
    const { ids } = this;

    let stories = ids.all
      .slice(ids.start, ids.start + ids.gap)
      .map(id =>
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      );

    let resolvedStories = [];
    axios
      .all(stories)
      .then(result => {
        resolvedStories = result.map(item => item.data);
      })
      .then(() => {
        this.stories = [...this.stories, ...resolvedStories];
        this.setLoading(false);
      })
      .then(() => {
        this.ids.start += this.ids.gap;
      })
      .catch(error => {
        this.setError(error);
        throw this.error;
      });
  }
}

decorate(Store, {
  stories: observable,
  error: observable,
  loading: observable,
  ids: observable,
  setLoading: action,
  setError: action,
  loadIds: action,
  fetchStories: action
});

const store = new Store();
export default store;
