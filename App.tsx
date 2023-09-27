import Routes from "./src/routes";
import { useFonts } from 'expo-font';
import { fonts } from "./src/utils/fonts";
import { Loading } from "./src/components/loading";
import theme from "./src/utils/theme/theme";


const App = () => {
    const [fontsLoad] = useFonts(fonts)

    return (
        fontsLoad ? <Routes /> : <Loading size={18} color={theme.colors.blue} justify="flex-start"/>
    )
}


export default App