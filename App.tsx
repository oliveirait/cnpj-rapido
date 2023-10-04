import Routes from "./src/routes";
import { Loading } from "./src/components/loading";
import theme from "./src/utils/theme/theme";
import { getFonts } from "./src/utils/fonts";


export default function App () 
{
    return getFonts ()
        ? <Routes /> 
        : <Loading size={18} color={theme.colors.blue} justify="flex-start"/>
}
