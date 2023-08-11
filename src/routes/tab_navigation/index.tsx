import { createDrawerNavigator } from '@react-navigation/drawer';

import { Home } from '../../screens/01_home';
import { Historic } from '../../screens/03_historic';


const Drawer = createDrawerNavigator()

const headerConfig = {
    screens: {
        home: 'Início',
        result: 'CNPJ',
        historic: 'Histórico'
    },
    drawer: {
        home: 'home',
        result: 'result',
        historic: 'historic'
    }
}


const Tab = () => {
    return (
        <Drawer.Navigator 
            initialRouteName={headerConfig.drawer.home}
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                    elevation: 10, shadowColor: '#000',
                }
            }}
        >       
            <Drawer.Screen 
                name={headerConfig.drawer.home} 
                component={Home} 
                options={{
                    headerTitle: headerConfig.screens.home, 
                    title: headerConfig.screens.home
                }}
            />

            <Drawer.Screen 
                name={headerConfig.drawer.historic} 
                component={Historic} 
                options={{
                    headerTitle: headerConfig.screens.historic, 
                    title: headerConfig.screens.historic
                }}
            />

        </Drawer.Navigator>
    )
}

export default Tab