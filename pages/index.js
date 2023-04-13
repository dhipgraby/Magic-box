import Grid from "components/Grid"
import Layout from "components/Layout"

export default function Home() {
  return (
    <Layout>
      <h1>Magic Box</h1>
      <hr />
      
      <Grid gridSize={5} />
    </Layout>
  )
}
