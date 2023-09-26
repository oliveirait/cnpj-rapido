import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack_routes';
import { useCallback } from 'react';
import { checkVersion } from '../services/checkVersion';


export default function Routes () {

    const ready = useCallback(() => {
        checkVersion()
    }, [])

    return (
        <NavigationContainer onReady={ready}>
            <StackRoutes />
        </NavigationContainer>
    )
}