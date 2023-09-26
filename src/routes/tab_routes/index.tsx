import { createDrawerNavigator } from '@react-navigation/drawer';

import { Home } from '../../screens/01_home';
import { HomeIcon } from '../../components/icons/HomeIcon';


const { Navigator, Screen } = createDrawerNavigator()

const screen = { 
    home: {
        pageName: 'home',
        headerName: 'Início',
        tabName: 'Início'
    },

    historic: {
        pageName: 'historic',
        headerName: 'Histórico',
        tabName: 'Histórico'
    },

    result: {
        pageName: 'result',
        headerName: 'Resultado',
        tabName: 'Resultado'
    },
}



const TabRoutes = () => {
    return (
        <Navigator
            initialRouteName={screen.home.pageName}
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: {fontFamily: 'Bold'},
                headerStyle: { elevation: 10, shadowColor: '#000' }
            }}
        >       
            <Screen 
                name={screen.home.pageName} 
                component={Home} 
                options={{
                    headerTitle: screen.home.headerName, 
                    title: screen.home.tabName,
                    drawerIcon: HomeIcon                    
                }}
            />
        </Navigator>
    )
}

export default TabRoutes