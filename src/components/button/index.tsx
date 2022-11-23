import styles from './styles.module.scss';
import { ButtonHTMLAttributes } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{}
export default function Button({...rest}){
    return(
        <button className={styles.button}{...rest}>
            
        </button>
    )
}