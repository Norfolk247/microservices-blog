import React, {ComponentType} from 'react'
import {LogtoProvider} from "@logto/react"
import {logtoConfig} from "../logtoConfig"

const MyLogtoProvider = ({children}: { children: React.ReactNode }) => {
    return (
        <LogtoProvider config={logtoConfig}>
            {children}
        </LogtoProvider>
    )
}

const withLogto = <Props, >(Component: ComponentType<Props>) => {
    const WrappedComponent = (props: Props) => <LogtoProvider config={logtoConfig}>
        <Component {...props}/>
    </LogtoProvider>

    return Object.assign(WrappedComponent, {displayName: 'WithLogto'})
}

export default MyLogtoProvider