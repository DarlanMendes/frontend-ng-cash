import { canSSRAuth } from '../../utils/canSSRAuth'
import UsersToTransfer from '../../components/userstotransfer'
import Header from '../../components/header'
export default function Transactions(){
    return(
      <div>
      <Header/>
        
          <UsersToTransfer/>
       </div>
    )
}
export const getServerSideProps= canSSRAuth(async(ctx)=>{
    return{
      props:{}
    }
  })