import React, { useState, useEffect } from 'react';
import Loader from 'components/Loader';
import Grid from "components/Grid"
import Layout from "components/Layout"
import Actions from "components/Actions"
import CreateGridBtn from "@/components/CreateGridBtn"

export default function Home() {

  const [gridSize, setGridSize] = useState(5)
  const [isLoading, setIsLoading] = useState(true)

  const handleGridSizeChange = (e) => {
    setGridSize(Number(e.target.value));
  }

  // Show the loader for 0.5 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Cleanup function to clear the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="purple">Magic Box</h1>
          <small>Have Fun Drawing in the Grid!</small>
          <hr />
          <CreateGridBtn
            handleGridSizeChange={handleGridSizeChange}
            gridSize={gridSize}
          />
          <Grid gridSize={gridSize} />
          <hr />
          <Actions />
        </>
      )}
    </Layout>
  )
}
