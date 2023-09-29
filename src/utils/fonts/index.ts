import { useFonts } from 'expo-font';

const fonts = {
    'Regular': require('./fonts/Montserrat-Regular.ttf'),
    'Bold': require('./fonts/Montserrat-Bold.ttf'),
}


export function getFonts () {
    const [fontsLoad] = useFonts(fonts)
    return fontsLoad
}