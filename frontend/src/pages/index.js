import Button from "@/components/ui/button";
import Layout from "@/components/layouts/layout";
import TextPage from "@/components/layouts/textPage"

/** Homepage
 *  
 *  @returns {JSX.Element}
*/
export default function Home() {

  // if the try went well, RETURN the users list 
  return (
    <TextPage api_url="/text/home" title="Benvenuto nella piattaforma di voto" subtitle="Modi per Truccare il voto"/>
  );
}
