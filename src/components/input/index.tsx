import styles from './styles.module.scss';
import { InputHTMLAttributes,TextareaHTMLAttributes } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
export default function Input({...rest}:InputProps){
    return(
        <input className={styles.input} {...rest}/>
    )
}