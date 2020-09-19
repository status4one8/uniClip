import { DefaultTheme } from 'react-native-paper';

export const PRIMARY = '#ff4757';
export const ACCENT = '#3742fa';

export const THEME = {
    ...DefaultTheme,
    roundness: 6,
    colors: {
        ...DefaultTheme.colors,
        background: '#fff',
        primary: PRIMARY,
        accent: ACCENT,
    },
};
