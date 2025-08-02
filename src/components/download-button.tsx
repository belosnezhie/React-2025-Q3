import { JSX } from 'react';

import type { RootState } from '@/state';

import { useAppSelector } from '@/hooks';

export const DownloadButton = (): JSX.Element => {
  const favCharacters = useAppSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const formData = (): string => {
    const csvData: string[][] = [];

    const titles = [
      'name',
      'hair_color',
      'skin_color',
      'eye_color',
      'birth_year',
      'gender',
    ];

    csvData.push(titles);

    for (const item of favCharacters) {
      const values: string[] = [];

      for (const [key, value] of Object.entries(item)) {
        if (titles.includes(key)) {
          values.push(String(value));
        }
      }

      csvData.push(values);
    }

    let content = '';

    for (const row of csvData) {
      content += row.join(';') + '\n';
    }

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8,' });
    const objectUrl = URL.createObjectURL(blob);

    return objectUrl;
  };

  return (
    <a
      className="download_button"
      download={`${favCharacters.length}_characters`}
      href={formData()}
    >
      Download
    </a>
  );
};
