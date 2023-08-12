import { ElementType, ReactNode } from "react"


interface ButtonIconProps {
    icon: ReactNode
}

export const ButtonIcon = ({icon: icon}: ButtonIconProps) => {
    return (
        <>
            {icon}
        </>
    )
}