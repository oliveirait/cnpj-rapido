import React from "react"
import theme from "../../utils/theme/theme"
import * as Icon from '@expo/vector-icons';


export function IconHome () {
    return <Icon.AntDesign name="home" size={24} color="black" />
}

export const IconShare = () => {
    return <Icon.MaterialCommunityIcons name="share-all" size={18} color={theme.colors.white} />
}