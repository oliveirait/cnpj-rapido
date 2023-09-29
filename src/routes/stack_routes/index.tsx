import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Result } from "../../screens/02_result";
import TabRoutes from "../tab_routes";
import { CepScreen } from "../../screens/04_cep";

const { Navigator, Screen } = createNativeStackNavigator()

const headerMain = "Menu"
const headerResult = 'Resultado'
const headerCep = 'CEP'



const StackRoutes = () => {
    return(
        <Navigator
            initialRouteName="main"
            screenOptions={
                {
                    headerShown: false, 
                    animation: "fade",
                    headerTitleStyle: {fontFamily: 'Bold'},
                }
            }>

            <Screen 
                name="main"
                component={TabRoutes}
            />

            <Screen 
                name="result"
                component={Result}
                options={
                    {
                        headerShown: true, 
                        headerTitleAlign: 'center', 
                        title: headerResult
                    }
                }/>

            <Screen 
                name="cep"
                component={CepScreen}
                options={
                    {
                        headerShown: true, 
                        headerTitleAlign: 'center', 
                        title: headerCep
                    }
                }/>
        </Navigator>
    )
}


export default StackRoutes