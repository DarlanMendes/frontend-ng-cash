import styles from './styles.module.scss';
import { InputHTMLAttributes } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
export default function InputSelection({...rest}:InputProps){
    return(
        <input className={styles.inputSelection} {...rest}/>
    )
}