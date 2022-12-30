import { NextPage } from "next";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'angular-component-m': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

const StreamPage: NextPage = () => {
    return (
        <>
            <div>
                <angular-component-m></angular-component-m>
            </div>
        </>
    )
}

export default StreamPage;
