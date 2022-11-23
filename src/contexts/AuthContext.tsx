import { createContext,ReactNode,useState,useEffect} from "react";
import {destroyCookie,setCookie,parseCookies} from 'nookies';
import Router from 'next/router';
import {api} from '../services/apiClient'
import {toast} from 'react-toastify'

//Contexto onde ocorre a autenticação
type AuthContextData ={
    user:UserProps;
    isAuthenticated:boolean;
    balance:number;
    signIn:(credentials:SignInProps)=>Promise<void>;
    signOut:()=>void;
    signUp:(credentials:SignUpProps)=>Promise<void>;
    
}
//Props do usuario que logar
type UserProps={
    id:string;
    name:string;
}

//Props utilizadas para logar 
type SignInProps={
    nameUser:string;
    password:string;
}


type SignUpProps={
    user:string;
    password:string;
}
//Provider que fornece autenticação
type AuthProviderProps={
    children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined,'@ngcash.token');
        Router.push("/")
    }catch(error){
        alert("Erro ao deslogar!")
    }
}
export function AuthProvider({children}:AuthProviderProps){
    const[user,setUser]=useState<UserProps>()
    const[balance,setBalance]=useState()
    
    //converte variavel user em booleana 
    const isAuthenticated= !!user;

    //------------------
    useEffect(()=>{
        const {'@ngcash.token':token}=parseCookies()
        
        if(token){
            //------Consulta ao saldo do usuário----------
            api.get("/user/balance").then(response=>{
                let{balance}=(response.data.account)
                balance=balance.toFixed(2)
                setBalance(balance);
                
            }).catch(()=>{
                signOut()
            })
            //------------Consulta as informações do nome do usuário----
            api.get("/user/me").then(res=>{
                  
                const{id,username}=(res.data.user)
                
                setUser({id,name:username})
                
             }).catch(()=>{
                 signOut()
             })
             
             
        }
    },[])
    async function signUp(data:SignUpProps){
        const{user,password}=data
        try {
            const response = await api.post("/users",{
                user,
                password
            })
            console.log(response.data)
            toast.success("Usuário cadastrado com sucesso")
            Router.push("/")
        } catch (error) {
            toast.error("Erro ao cadastrar!")
        }
    }
    async function signIn(data:SignInProps){
        const{nameUser,password}=data
        try{
            const response = await api.post('/session',{
                username:nameUser,
                password:password
            })
            const{id,username,token}=response.data;
            setCookie(undefined,'@ngcash.token',token,{
                maxAge:60*60*24,//expira em 1 dia
                path:"/" //Quais caminhos terão acesso
            })
            setUser({
                id,
                name:username
            })
            api.defaults.headers['Authorization']=`Bearer ${token}`
            toast.success("Usuário logado com sucesso!")
            //Direcionar o usuário para tela de Balance
            Router.push("/balance")

        }catch{
            toast.error("Erro ao fazer o login!")

        }
        //Passar para próximas requisições o nosso token
        
        
    }
    return(
        <AuthContext.Provider value={{ user,isAuthenticated,signIn,signOut,signUp,balance}}>
            {children}
        </AuthContext.Provider>
    )
}