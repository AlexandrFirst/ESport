import { NextPage } from "next";

import './../angularFiles/main'
import './../angularFiles/polyfills'
import './../angularFiles/runtime'


const StreamPage: NextPage = () => {
    return (
        <>
            <div>
                {<angular-component  /> as any}
            </div>
        </>
    )
}

export default StreamPage;