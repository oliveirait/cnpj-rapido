import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack_routes';
import { useEffect } from 'react';
import { checkVersion } from '../services/checkVersion';


export default function Routes () {
    
    useEffect(() => {
      checkVersion()
    }, [])

    return (
        <NavigationContainer>
            <StackRoutes />
        </NavigationContainer>
    )
}