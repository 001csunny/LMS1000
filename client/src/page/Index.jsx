import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
function Index() {
    return (
        <div className="flex flex-col w-dvw h-dvh">
            <Header />
            <div className="flex bg-red-200 w-full h-full"></div>
            <Footer />
        </div>
    );
}

export default Index;
