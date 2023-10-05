import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack_routes';
import { checkVersion } from '../services/checkVersion';


export default function Routes () {

    function ready () 
    {
        checkVersion ()
    }

    return (
        <NavigationContainer onReady={ready}>
            <StackRoutes />
        </NavigationContainer>
    )
}