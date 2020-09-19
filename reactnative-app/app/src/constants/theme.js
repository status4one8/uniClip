import { DefaultTheme } from 'react-native-paper';

export const PRIMARY = '#ff4757';
export const ACCENT = '#3742fa';

export const ANDROID_COLOR = '#30D780';
export const ANDROID_COLOR_TRANSLUCENT = 'rgba(49, 216, 130, 0.6)';
export const PC_COLOR = '#0079D8';
export const PC_COLOR_TRANSLUCENT = 'rgba(0, 121, 214, 0.6)';

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
