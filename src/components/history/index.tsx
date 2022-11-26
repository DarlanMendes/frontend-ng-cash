import styles from './styles.module.scss'
import InputSelection from '../../components/inputselection'
import Label from '../../components/label'
import { useState } from 'react';

type CashItemProps = {
    id: string;
    value: number;
    createdAt: string;
    debitedAccountId: string;
    creditedAccountId: string;
}
interface CashProps {
    cashIn: CashItemProps[],
    cashOut: CashItemProps[]
}

export default function History({ cashIn, cashOut }: CashProps) {
    const [showCashIn, setShowCashIn] = useState(true);
    const [showCashOut, setShowCashOut] = useState(true);
   

    return (<>
        <div className={styles.historyContainer}>
            <div className={styles.containerCheckbox}>
                <div className={styles.checkBoxCash}>
                    <Label >
                        Cash-in:</Label>
                    <InputSelection type="checkbox" checked={showCashIn} defaultChecked={true} onClick={() => { setShowCashIn(!showCashIn) }} />
                </div>
                <div className={styles.checkBoxCash}>
                    <Label >
                        Cash-out:</Label>
                    <InputSelection type="checkbox" checked={showCashOut} onClick={() => { setShowCashOut(!showCashOut) }} />
                </div>
            </div>
            <div className={styles.cashContainerIn}>
                <div>
                    <h2>Valores recebidos</h2>
                    {cashIn? cashIn.map((item, index) => (

                        <div key={index} className={styles.cashCard}>

                            <h3> {index + 1} - Valor recebido:</h3>
                            <div className={styles.cardDisplay}>
                                <h2 className={styles.value}> +{String(item.value.toFixed(2)).replace('.', ',')}</h2>
                                <h2> {item.createdAt.slice(8, 10)}/{item.createdAt.slice(5, 7)}/{item.createdAt.slice(0, 4)} </h2>
                            </div>
                        </div>

                    )) :
                        showCashIn ? <h4>"Você não recebeu nenhum valor ainda."</h4>:''}
                </div>

            </div>
            <div className={styles.cashContainerOut}>
                <div>
                    <h2>Valores transferidos</h2>
                    {cashOut && showCashOut ? cashOut.map((item, index) => (

                        <div key={index} className={styles.cashCard}>
                            <h3>{index + 1} - Valor transferido:</h3>
                            <div className={styles.cardDisplay}>
                                <h2 className={styles.value}> + {String(item.value.toFixed(2)).replace('.', ',')}</h2>
                                <h2> {item.createdAt.slice(8, 10)}/{item.createdAt.slice(5, 7)}/{item.createdAt.slice(0, 4)} </h2>
                            </div>
                        </div>
                    )) : showCashOut?
                        <h4>"Você não transferiu nenhum valor ainda."</h4>:''}
                </div>
            </div>

        </div>

    </>)
}
