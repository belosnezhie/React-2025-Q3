import './FallbackUIPage.css';

import { useTheme } from '../../hooks/ContextHooks';

const FallbackUIPage = () => {
  const theme = useTheme();

  return (
    <div className={theme + ' fallbackUI_page'}>
      <h2>Oops! Something went wrong. Please try again later.</h2>
    </div>
  );
};

export default FallbackUIPage;
