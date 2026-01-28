import TextPage from "@/components/layouts/textPage"

/** Candidates
 *  create candidate page
 *  @returns {JSX.Element}
*/
export default function Candidates() {
  return <TextPage api_url="/text/candidates" title="Candidati"/>;
}