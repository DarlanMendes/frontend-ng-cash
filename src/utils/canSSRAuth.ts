import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { AuthTokenError } from '../services/errors/AuthTokenError'
//função para páginas que só podem ser acessadas por visitantes
export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        //Se o cara já está logado redireciona 
        const cookies = parseCookies(ctx)
        const token = cookies['@ngcash.token']
        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        } else {
            try {
                return await fn(ctx)
            } catch (error) {
                if (error instanceof AuthTokenError) {
                    destroyCookie(ctx, '@ngcash.token')


                    return {
                        redirect: {
                            destination: '/',
                            permanent: false
                        }
                    }
                }
            }
        }


    }
}