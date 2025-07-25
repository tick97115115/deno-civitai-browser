import { Layout } from "antd";
import "./App.css";
import Gallery from "./components/Gallery.tsx";
import OrpcInteract from "./examples/orpcClient.tsx";
import ViteVarianble from "./examples/viteVariable.tsx";
import SearchBar from "./components/SearchBar.tsx";
import Settings from "./components/SettingsButton.tsx";

const { Footer, Content } = Layout;

const layoutStyle: React.CSSProperties = {
  height: "100dvh",
};
const footerStyle: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 128, 0.09)",
  display: "flex",
  justifyContent: "center",
  padding: "12px 24px",
};
const contentStyle: React.CSSProperties = {
  backgroundColor: "azure",
  overflow: "auto",
};

const App = () => (
  <div>
    <Layout style={layoutStyle}>
      <Content style={contentStyle}>
        {/* <Gallery></Gallery> */}
        <OrpcInteract></OrpcInteract>
        <ViteVarianble></ViteVarianble>
      </Content>
      <Footer style={footerStyle}>
        <Settings></Settings>
        <SearchBar></SearchBar>
      </Footer>
    </Layout>
  </div>
);

export default App;
