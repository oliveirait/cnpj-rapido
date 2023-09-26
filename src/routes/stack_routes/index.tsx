import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Result } from "../../screens/02_result";
import TabRoutes from "../tab_routes";
import { Button } from "react-native";

const { Navigator, Screen } = createNativeStackNavigator()

const headerMain = "Menu"
const headerResult = 'Resultado'



const StackRoutes = () => {
    return(
        <Navigator 
            initialRouteName="main"
            screenOptions={{
                headerShown: false, 
                animation: "fade",
                headerTitleStyle: {fontFamily: 'Bold'},
            }}
        >

            <Screen 
                name="main"
                component={TabRoutes}
            />

            <Screen 
                name="result"
                component={Result}
                options={{
                    headerShown: true, 
                    headerTitleAlign: 'center', 
                    title: headerResult
                }}
            />



        </Navigator>
    )
}


export default StackRoutes