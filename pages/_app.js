import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/global.css"
import "../css/Grid.css"
import "../css/Responsive.css"

import { GlobalProvider } from "helpers/GlobalContext";
import { SSRProvider } from "react-bootstrap";

function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </SSRProvider>

  );
}

export default App;
