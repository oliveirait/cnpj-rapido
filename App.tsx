import { SkeletInitApp } from "./src/components/skelet/SkeletInitApp";
import Routes from "./src/routes";
import { getFonts } from "./src/utils/fonts";



export default function App () 
{
    return getFonts () ? <Routes /> : <SkeletInitApp />        
}



