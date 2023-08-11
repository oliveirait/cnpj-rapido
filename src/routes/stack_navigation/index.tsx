import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Result } from "../../screens/02_result";
import Tab from "../tab_navigation";

const Navigation = createNativeStackNavigator()


const Stack = () => {
    return(
        <Navigation.Navigator
            screenOptions={{headerShown: false}}
        >
            <Navigation.Screen 
                name={'result'}
                component={Tab}
            />
        </Navigation.Navigator>
    )
}


export default Stack