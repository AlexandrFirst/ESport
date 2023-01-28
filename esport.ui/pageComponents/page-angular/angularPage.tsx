import { useRouter } from "next/router";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const AngularPage: React.FC = () => {

    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = `http://localhost:4200/main.js`;
        script1.async = true;
        document.body.appendChild(script1);


        const script2 = document.createElement('script');
        script2.src = `http://localhost:4200/polyfills.js`;
        script2.async = true;
        document.body.appendChild(script2);

        const script3 = document.createElement('script');
        script3.src = `http://localhost:4200/runtime.js`;
        script3.async = true;
        document.body.appendChild(script3);

        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
            document.body.removeChild(script3);
        };
    }, [pathname]);

    return createPortal(<div>
        sdsd
        <angular-component-m></angular-component-m>
    </div>, document.body);
}

export default AngularPage;