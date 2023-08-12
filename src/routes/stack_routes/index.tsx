import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Result } from "../../screens/02_result";
import TabRoutes from "../tab_routes";

const { Navigator, Screen } = createNativeStackNavigator()

const screen = { 
    main: {
        pageName: 'main',
        headerName: 'Início'
    },

    result: {
        pageName: 'result',
        headerName: 'Resultado'
    },
}


const StackRoutes = () => {
    return(
        <Navigator screenOptions={{
            headerShown: false, 
            animation: "fade",
            headerTitleStyle: {fontFamily: 'Bold'},
        }}>

            <Screen 
                name={screen.main.headerName}
                component={TabRoutes}
            />

            <Screen 
                name={screen.result.pageName}
                component={Result}
                options={{
                    headerShown: true, 
                    headerTitleAlign: 'center', 
                    title: screen.result.headerName
                }}
            />

        </Navigator>
    )
}


export default StackRoutes