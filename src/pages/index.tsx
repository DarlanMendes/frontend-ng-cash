import { useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import Button from '../components/button'
import Input from '../components/input'
import LogoNG from '../../public/logo-ngcash.svg'
import { useState } from 'react'
import Link from 'next/link'
import { AuthContext } from '../contexts/AuthContext'
import {VscLoading} from 'react-icons/vsc'
import { canSSRGuest} from '../utils/canSSRGuest'
export default function Home() {
  const { signIn } = useContext(AuthContext)
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleLogin() {
    if (name === '' || password === '') {
      alert("Por favor, preencha todos os campos")
    } else {
      setLoading(true)
      let data = {
        nameUser:name,
        password
      }
      await signIn(data)
      setLoading(false)

    }

  }
  return (
    <>
      <Head>
        <title>NG Cash - Faça o login</title>
      </Head>
      <div className={styles.container}>


        <main className={styles.main}>
          <Image src={LogoNG} alt="Logo NG CASH" className={styles.logo} />
          <Input
            placeholder='Digite seu nome de usuário'
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <Input
            placeholder='Digite sua senha'
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <Button
            onClick={handleLogin}
            
          >{loading?<VscLoading className={styles.loading}/>:'Login'}
          </Button>
          <Link className={styles.text}
            href="/signup">
            Não possui uma conta?Cadastre-se
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
  