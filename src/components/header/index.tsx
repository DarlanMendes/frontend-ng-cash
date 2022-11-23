import { useContext } from 'react'
import LogoNg from '../../../public/logo-ngcash.svg'
import Image from 'next/image'
import styles from './styles.module.scss'
import Link from 'next/link'
import {FiLogOut} from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContext' 


export default function Header(){
    const{signOut,user}=useContext(AuthContext)
    
    
    return(
        <header className={styles.containerHeader}>
            <div>
                <Image className={styles.imgLogo} src={LogoNg} alt="logo ng cash"/>
               <h1>
                 {user?.name}
                </h1>
            </div>
            <div>
            <Link className={styles.link} href={"/transactions"}>
               Transferir
            </Link>
           
            <FiLogOut 
            className={styles.logout}
             onClick={signOut}/>
            </div>
            
        </header>
    )
}