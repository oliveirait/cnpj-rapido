import NetInfo from '@react-native-community/netinfo';

export async function checkNetwork () {
    return NetInfo.fetch().then(state => state?.isConnected)
}