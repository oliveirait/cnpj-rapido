import Routes from "./src/routes";
import { useFonts } from 'expo-font';
import { fonts } from "./src/utils/fonts";
import { Loading } from "./src/components/loading";


const App = () => {
    const [fontsLoad] = useFonts(fonts)

    return (
        fontsLoad ? <Routes /> : <Loading size={14} color="#000" justify="flex-start"/>
    )
}


export default App 