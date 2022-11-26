import { useContext } from 'react'
import LogoNg from '../../../public/logo-ngcash.svg'
import Image from 'next/image'
import styles from './styles.module.scss'
import Link from 'next/link'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContext'
import { useRouter } from 'next/router'

export default function Header() {
    const { signOut, user } = useContext(AuthContext)
    const router = useRouter()
    
    return (
        <header className={styles.containerHeader}>
            <div>
                <Image className={styles.imgLogo} src={LogoNg} alt="logo ng cash" />
                <h1>
                    {user?.name}
                </h1>
            </div>
            <div>
                {router.pathname === "/balance" ?
                    <Link className={styles.link} href={"/transactions"}>
                        Transferir
                    </Link>
                    : <Link className={styles.link} href={"/balance"}>
                        Saldo
                    </Link>}

                <FiLogOut
                    className={styles.logout}
                    onClick={signOut} />
            </div>

        </header>
    )
}