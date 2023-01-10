import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import "./App.css";
import Calculator from "./components/Calculator/Calculator";
import Logger from "./components/Logger/Logger";

function App() {
  return (
    <Layout style={{ height: "100%" }}>
      <Header style={{ color: "white" }}>
        <h1 style={{ marginTop: 0 }}>Invosy-EST Salary Test</h1>
      </Header>
      <Layout style={{ height: "100%", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            height: "100%",
            marginTop: 50,
          }}
        >
          <Calculator />
          <Logger />
        </div>
      </Layout>
    </Layout>
  );
}

export default App;
