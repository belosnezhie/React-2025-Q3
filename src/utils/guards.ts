import {
  CharacterSearchResponse,
  SearchResponse,
} from '../model/types-star-wars';

const validateCharacterSearchResponse = (
  object: unknown,
): object is CharacterSearchResponse => {
  if (typeof object !== 'object' || object === null) {
    return false;
  }

  const entries = Object.entries(object);

  const map = new Map(entries);

  if (typeof map.get('name') !== 'string') {
    return false;
  }

  const optionalStringFields = [
    'birth_year',
    'eye_color',
    'gender',
    'hair_color',
    'height',
    'mass',
    'skin_color',
  ];

  for (const field of optionalStringFields) {
    if (map.has(field) && typeof map.get(field) !== 'string') {
      return false;
    }
  }

  return true;
};

export const validateSearchResponse = (
  data: unknown,
): data is SearchResponse => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const dataEntries: [string, unknown][] = Object.entries(data);
  const map = new Map<string, unknown>(dataEntries);

  const results = map.get('results');

  if (!Array.isArray(results)) {
    return false;
  }

  return results.every((item) => validateCharacterSearchResponse(item));
};
