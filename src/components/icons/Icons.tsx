import React from "react"
import theme from "../../utils/theme/theme"
import * as Icon from '@expo/vector-icons';


export function IconHome () {
    return <Icon.AntDesign name="home" size={22} color="black" />
}

export const IconShare = () => {
    return <Icon.MaterialCommunityIcons name="share-all" size={18} color={theme.icons.white} />
}

export const IconSearch = () => {
    return <Icon.MaterialCommunityIcons name="search-web" size={18} color={theme.icons.white} />
}

export const IconView = () => {
    return <Icon.MaterialCommunityIcons name="eye-circle" size={20} color={theme.icons.blue_link} />
}

export const IconPhone = () => {
    return <Icon.MaterialCommunityIcons name="phone-check" size={20} color={theme.icons.blue_link}  />
}

export const IconHistoric = () => {
    return <Icon.MaterialCommunityIcons name="history" size={24} color={theme.icons.blue_link}  />
}

export const IconGmaps = () => {
    return <Icon.MaterialCommunityIcons name="map-search" size={20} color={theme.icons.blue_link} />
}
