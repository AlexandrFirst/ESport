const interfaceConst = "interface";

module.exports = (componentName) => `import { FC } from 'react';
import styles from './${componentName}.module.css';

${interfaceConst} ${componentName}Props {
    className?: string;
}

export const ${componentName}: FC<${componentName}Props> = (props) => {
    
    return (
        <div className={styles.wrapper}>
           
        </div>
    );
};`;
