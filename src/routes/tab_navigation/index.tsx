import { createDrawerNavigator } from '@react-navigation/drawer';

import { Home } from '../../screens/01_home';
import { Cnpj_Viewer } from '../../screens/02_cnpj_viewer';


const Drawer = createDrawerNavigator()


const Tab = () => {
    return (
        <Drawer.Navigator initialRouteName='home'>       
            <Drawer.Screen 
                name='home' 
                component={Home} 
                options={{headerTitle: "Inicio", title: "Inicio"}}
            />

            <Drawer.Screen 
                name='cnpj_viewer' 
                component={Cnpj_Viewer} 
                options={{headerTitle: "CNPJ", title: "CNPJ"}}
            />
        </Drawer.Navigator>
    )
}

export default Tab