import styles from './styles.module.scss';
import { InputHTMLAttributes } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
export default function Input({...rest}:InputProps){
    return(
        <input className={styles.input} {...rest}/>
    )
}