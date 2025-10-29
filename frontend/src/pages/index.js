

import Button from "@/components/ui/button";
import Layout from "@/components/layouts/layout";


/** Homepage
 *  
 *  @returns {JSX.Element}
*/
export default function Home() {

  // if the try went well, RETURN the users list 
  return (
    <Layout>
    <div style={{ padding: "20px" }}>
      <h1>Benvenuto nella piattaforma di voto</h1>
        <Button label="Annulla" variant="secondary" size="small"/>
        <Button label="Profilo" variant="outline"/>
    </div>
     </Layout>
  );
}
