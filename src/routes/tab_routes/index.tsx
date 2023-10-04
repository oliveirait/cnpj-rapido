import { createDrawerNavigator } from '@react-navigation/drawer';

import { Home } from '../../screens/01_home';
import { IconHome, IconHistoric } from '../../components/icons/Icons';
import { Historic } from '../../screens/03_historic';


const { Navigator, Screen } = createDrawerNavigator()


const TabRoutes = () => {
    return (
        <Navigator
            initialRouteName='home'
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: {fontFamily: 'Bold'},
                headerStyle: { elevation: 10, shadowColor: '#000' }
            }}
        >       
            <Screen 
                name='home'
                component={Home} 
                options={{
                    headerTitle: 'INICIO',
                    title: 'INICIO',
                    drawerIcon: IconHome                    
                }}
            />
            <Screen 
                name='historic'
                component={Historic} 
                options={{
                    headerTitle: 'HISTORICO',
                    title: 'HISTORICO',
                    drawerIcon: IconHistoric                    
                }}
            />
        </Navigator>
    )
}

export default TabRoutes