import Grid from "components/Grid"
import Layout from "components/Layout"
import Actions from "components/Actions"
import { useState } from "react"
import CreateGridBtn from "@/components/CreateGridBtn"

export default function Home() {

  const [gridSize, setGridSize] = useState(5)

  const handleGridSizeChange = (e) => {
    setGridSize(Number(e.target.value));
  }

  return (
    <Layout>
      <h1>Magic Box</h1>
      <small>Having drawing in the Grid!</small>
      <hr />
      <CreateGridBtn
        handleGridSizeChange={handleGridSizeChange}
        gridSize={gridSize}
      />
      <Grid gridSize={gridSize} />
      <hr />

      <Actions />
    </Layout>
  )
}
