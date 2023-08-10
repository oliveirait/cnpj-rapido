import React, { ReactNode } from "react"
import { TouchableOpacityProps, TouchableOpacity, StyleSheet } from "react-native"


interface ButtonProps extends TouchableOpacityProps {
    children: ReactNode
}

export const ButtonWrapper = ({children, ...rest}: ButtonProps) => {
    return (
        <TouchableOpacity {...rest}>
            {children}
        </TouchableOpacity>
    )
}

