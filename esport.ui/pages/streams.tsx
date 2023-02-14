import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'angular-component-m': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

const StreamsPage: NextPage = () => {

    let basePath = process.env.NEXT_PUBLIC_STREAM_UI_APP ?? "";


    console.log('STREAM_UI_APP', process.env.NEXT_PUBLIC_STREAM_UI_APP);
    console.log('NEXT_PUBLIC_LOGIN_API_URL', process.env.NEXT_PUBLIC_LOGIN_API_URL);


    const [value, setValue] = useState('');

    const router = useRouter();

    function getIFramePath(_newUrl: string) {
        const newUrl = _newUrl;
        let hashPart = newUrl.split('#')[1];
        if (!hashPart) { hashPart = 'streams' }
        console.log('new angular path: ', hashPart);
        setValue(hashPart);
    }

    useEffect(() => {
        window.addEventListener('hashchange', (e: HashChangeEvent) => {
            getIFramePath(e.newURL);
        }, false);

        getIFramePath(router.asPath);
    }, []);

    return (
        <>
            <div>
                <iframe src={`${basePath}${value}`} style={{
                    width: '100%',
                    minHeight: '100vh'
                }} allow="camera *;microphone *"></iframe>
            </div>
        </>
    )
}



export default StreamsPage;