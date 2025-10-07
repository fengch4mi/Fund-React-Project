import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const DEFAULT = { theme: 'light', toggleTheme: () => {} };

export const useTheme = () => useContext(ThemeContext) || DEFAULT;
