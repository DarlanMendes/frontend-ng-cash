import styles from './styles.module.scss'

type CashItemProps = {
    id: string;
    value: number;
    createdAt: string;
    debitedAccountId: string;
    creditedAccountId: string;
}
interface CashProps {
    cashIn?: CashItemProps[],
    cashOut?: CashItemProps[]
}

export default function History({ cashIn, cashOut }: CashProps) {

    return (<>
        <div className={styles.historyContainer}>
            <div className={styles.cashContainer}>
                Valores recebidos
                {cashIn && cashIn.map((item, index) => (
                    <div key={index}>{item.id}</div>
                ))}
            </div>
            <div className={styles.cashContainer}>
                Valores transferidos
                {cashOut && cashOut.map((item, index) => (
                    <div key={index}>{item.id}</div>
                ))}
            </div>

        </div>

    </>)
}
