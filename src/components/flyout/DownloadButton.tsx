import { useAppSelector } from '../../hooks/StateHooks';
import type { RootState } from '../../store/Store';

import styles from './Flyout.module.css';

export const DownloadButton = () => {
  const favCharacters = useAppSelector(
    (state: RootState) => state.favoriteCharacters.favCharacters,
  );

  const formData = () => {
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

    favCharacters.forEach((item) => {
      const values: string[] = [];

      for (const [key, value] of Object.entries(item)) {
        if (titles.includes(key)) {
          values.push(String(value));
        }
      }

      csvData.push(values);
    });

    let content = '';

    csvData.forEach((row) => {
      content += row.join(';') + '\n';
    });

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8,' });
    const objUrl = URL.createObjectURL(blob);

    return objUrl;
  };

  return (
    <a
      className={styles.downloadButton}
      href={formData()}
      download={`${favCharacters.length}_characters`}
    >
      Download
    </a>
  );
};
