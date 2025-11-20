import Layout from "@/components/layouts/layout";

/** Candidates
 *  
 *  @returns {JSX.Element}
*/
export default function Candidates() {

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h1 style={{paddingBottom: "15px"}}>Candidati</h1>
        
        <h3> <p>Candidato A</p> </h3>
        <div style={{marginLeft:"20px"}}> 
            Merita di vincere, dovreste votarlo tutti.
        </div>

        <br />
      
        <h3> <p>Candidato B</p> </h3>
        <div style={{marginLeft:"20px"}}> 
            Non è nulla di che, ha un bel pappagallo.
        </div>

        <br />

        <h3> <p>Candidato C</p> </h3>
        <div style={{marginLeft:"20px"}}> 
            Ma che ci fa qui?
        </div>
      </div>
    </Layout>
  );
}