export { ThemeContext, type ThemeContextType } from './context/theme-context';
export { ThemeProvider } from './context/theme-provider';
export {
  addToFavorites,
  clearFavorites,
  removeFromFavorites,
} from './store/favorites-slice/favorites-slice';

export type { AppDispatch, AppStore, RootState } from './store/store';
export { store } from './store/store';
