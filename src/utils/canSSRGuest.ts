import {GetServerSideProps,GetServerSidePropsContext,GetServerSidePropsResult} from 'next'
import {parseCookies} from 'nookies'

//função para páginas que só podem ser acessadas por visitantes
export function canSSRGuest<P>(fn:GetServerSideProps<P>){
    return async (ctx:GetServerSidePropsContext):Promise<GetServerSidePropsResult<P>>=>{

        //Se o cara já está logado redireciona 
        const cookies = parseCookies(ctx)

        if(cookies['@ngcash.token']){
            return{
                redirect:{
                    destination:'/balance',
                    permanent:false
                }
            }
        }

        return await fn(ctx)
    }
}