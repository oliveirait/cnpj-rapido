import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack_routes';


export default function Routes () {
    return (
        <NavigationContainer>
            <StackRoutes />
        </NavigationContainer>
    )
}