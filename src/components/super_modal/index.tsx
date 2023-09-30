import { ReactNode } from "react"
import Modal from "react-native-modal/dist/modal"


interface SuperModalProps {
    isVisible: boolean
    children: ReactNode
}

export function SuperModal ({isVisible, children}: SuperModalProps)  {
    return (
        <Modal
            animationIn={"slideInUp"} 
            animationOut={'slideOutDown'}
            animationOutTiming={500}
            isVisible={isVisible}
            backdropOpacity={0.6}
        >
            {children}
            
      </Modal>
    )
}