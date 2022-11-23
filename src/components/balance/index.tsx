import { AuthContext } from "../../contexts/AuthContext"
import {useContext} from 'react'
import styles from './styles.module.scss'

export default function BalanceContainer(){
    let{balance}=useContext(AuthContext);
    let saldo = String(balance)
    saldo=saldo.replace('.',',')
    return(
        <>
        <div className={styles.balanceContainer}>

            <h1>Seu saldo é de:</h1>
            <hr/>
            <h1 className={styles.saldo}>
                {saldo?saldo:'Carregando...'}
            </h1>
        </div>
        
        </>
        
    )
}

