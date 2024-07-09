import './style.css'
import { Marvel } from './components/Marvel'
import md5 from 'js-md5';

function App() {
  {/* en la documentación de la API venía como estructurar la información
    para que se generara mi hash.
    
 console.log(md5("0112"+"81951ea8865e43817692d19357548f14b6dcf8ab"+"1ea305c5370f5152a5796ad1385ef687"))
  console.log(md5("0526"+"9a02d103a27eca2a7231cda7a3eb8e8cbf584779"+"9db902ff00bb0731b41e5a585761c905"))
 */}



  return (
    <>
     <Marvel/>
    </>
  )
}

export default App
