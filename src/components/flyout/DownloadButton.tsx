import { useAppSelector } from '../../hooks/StateHooks';
import type { RootState } from '../../store/Store';

export const DownloadButton = () => {
  const favCharacters = useAppSelector(
    (state: RootState) => state.favoriteCharacters.favCharacters,
  );

  const formData = () => {
    const titles = Object.keys(favCharacters[0]);

    const csvData = [];

    csvData.push(titles);

    favCharacters.forEach((item) => {
      csvData.push(Object.values(item));
    });

    let content = '';

    csvData.forEach((row) => {
      content += row.join(',') + '\n';
    });

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8,' });
    const objUrl = URL.createObjectURL(blob);

    return objUrl;
  };

  return (
    <a
      className="download_button"
      href={formData()}
      download={`${favCharacters.length}_characters`}
    >
      Download
    </a>
  );
};
