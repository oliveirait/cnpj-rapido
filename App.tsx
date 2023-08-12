import Routes from "./src/routes";
import { useFonts } from 'expo-font';
import { fonts } from "./src/utils/fonts";
import { ActivityIndicator } from "react-native";


export default function App () {
    const [fontsLoad] = useFonts(fonts) 

    return (
        fontsLoad ? <Routes /> : <ActivityIndicator size={16} color={'#000'}/> 
    )
}
