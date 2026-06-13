import React from "react"
import PublicNavbar from "../_components/PublicNavbar"

const layout = ({ children }: { children: React.ReactNode }) => {
    return <>
        <PublicNavbar />
        {children}
    </>
}

export default layout