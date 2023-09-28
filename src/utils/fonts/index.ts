import { useFonts } from 'expo-font';

const fonts = {
    'Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
}


export function getFonts () {
    const [fontsLoad] = useFonts(fonts)
    return fontsLoad
}