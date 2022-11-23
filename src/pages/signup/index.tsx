import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Home.module.scss'
import Button from '../../components/button'
import Input from '../../components/input'
import LogoNG from '../../../public/logo-ngcash.svg'
import { useState,useContext} from 'react'
import Link from 'next/link'
import {VscLoading} from 'react-icons/vsc'
import { AuthContext } from '../../contexts/AuthContext'
import { toast} from 'react-toastify'
import { canSSRGuest } from '../../utils/canSSRGuest'
export default function SignUp() {
  const{signUp}=useContext(AuthContext)
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]= useState(false)
  async function handleLogin (){
    if (username===''|| password==='') {
      toast.error("Erro!Preencha todos os campos!")
    } else {
      setLoading(true)
      let data ={
        user:username,
        password:password
      }
      await signUp(data)
      setLoading(false)
    }
  }
  return (
    <>
    <Head>
      <title>NG Cash - Faça o seu cadastro</title>
    </Head>
      <div className={styles.container}>
        

        <main className={styles.main}>
          <Image src={LogoNG} alt="Logo NG CASH" className={styles.logo} />
          <h2>Realize seu cadastro</h2>
          <Input
            placeholder='Digite seu nome de usuário'
            type="text"
            onChange={(e) => {
              setUserName(e.target.value)
            }}
          />
          <Input
            placeholder='Digite sua senha'
            type="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <Button onClick={handleLogin}>
            {loading?<VscLoading className={styles.loading}/>:'Cadastrar'}
          </Button>
          <Link className={styles.text}
          href="/"> 
          Já possui cadastro? Faça o login.
          </Link>
        </main>
      </div>
    </>
  )
}
export const getServerSideProps= canSSRGuest(async(ctx)=>{
  return{
    props:{}
  }
})