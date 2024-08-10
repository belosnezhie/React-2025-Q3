'use client';

import { useTheme } from '../hooks/ContextHooks';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return <div className={theme}>{children}</div>;
};

export default Wrapper;
