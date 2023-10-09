import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native'
import { Result } from "../../screens/02_result";
import TabRoutes from "../tab_routes";
import { CepScreen } from "../../screens/04_cep";
import { IconGmaps, IconHome } from "../../components/icons/Icons";
import { Btn } from "../../components/button";
import theme from "../../utils/theme/theme";

const { Navigator, Screen } = createNativeStackNavigator()


const headerMain = "Menu"
const headerResult = 'Resultado'
const headerCep = 'CEP'


function ButtonHistoric ()
{
    const { navigate } = useNavigation()
    return (
        <Btn.Wrapper onPress={() => navigate('historic')}
            style={{alignSelf: 'center', marginVertical: 5, backgroundColor: (theme.colors.blue), padding: 4, borderRadius: 5}}>
            <Btn.Text text={ 'Historico'} style={{color: theme.colors.white, fontSize: 12}} />
        </Btn.Wrapper>
    )
}


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
                        title: headerResult,
                        headerRight: ButtonHistoric
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