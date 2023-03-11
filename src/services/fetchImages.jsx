import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchImages = async (query, pageNr) => {
  const response = await axios.get(
    `?q=${query}&page=${pageNr}&key=33396642-88ffcce956eb96348099fcd2e&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits.map(image => {
    return {
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    };
  });
};
