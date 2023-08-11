import { NavigationContainer } from '@react-navigation/native';
import Tab from "./tab_navigation"
import Stack from './stack_navigation';


export default function Routes () {
    return (
        <NavigationContainer>
            <Stack />
        </NavigationContainer>
    )
}