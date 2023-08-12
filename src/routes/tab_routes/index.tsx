import { createDrawerNavigator } from '@react-navigation/drawer';

import { Home } from '../../screens/01_home';
import { Historic } from '../../screens/03_historic';


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
                    title: screen.home.tabName
                }}
            />

            <Screen 
                name={screen.historic.pageName} 
                component={Historic} 
                options={{
                    headerTitle: screen.historic.headerName, 
                    title: screen.historic.tabName
                }}
            />

        </Navigator>
    )
}

export default TabRoutes