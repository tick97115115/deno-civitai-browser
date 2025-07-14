import {
  Checkbox,
  type GetProp,
  Input,
  Layout,
  Popover,
  Select,
  Space,
} from "antd";
import { KeyOutlined, SortAscendingOutlined } from "@ant-design/icons";
import "./App.css";

const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;

const layoutStyle: React.CSSProperties = {
  height: "100dvh",
};
const footerStyle: React.CSSProperties = {
  backgroundColor: "aqua",
  display: "flex",
  justifyContent: "center",
};
const contentStyle: React.CSSProperties = {
  backgroundColor: "azure",
};

const searchBarStyle: React.CSSProperties = {
  maxWidth: "400px",
  width: "40dvw",
  minWidth: "200px",
};

const searchBarPopoverStyle: React.CSSProperties = {
  maxWidth: "400px",
  width: "40dvw",
  minWidth: "200px",
};

const options = [
  {
    label: "China",
    value: "china",
    emoji: "🇨🇳",
    desc: "China (中国)",
  },
  {
    label: "USA",
    value: "usa",
    emoji: "🇺🇸",
    desc: "USA (美国)",
  },
  {
    label: "Japan",
    value: "japan",
    emoji: "🇯🇵",
    desc: "Japan (日本)",
  },
  {
    label: "Korea",
    value: "korea",
    emoji: "🇰🇷",
    desc: "Korea (韩国)",
  },
];
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const plainOptions = ["Apple", "Pear", "Orange"];
const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
  checkedValues,
) => {
  console.log("checked = ", checkedValues);
};
const AdvancedSearchOpts = (
  <div style={searchBarPopoverStyle}>
    <Checkbox.Group
      options={plainOptions}
      defaultValue={["Apple"]}
      onChange={onChange}
    />
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      placeholder="select one country"
      defaultValue={["china"]}
      onChange={handleChange}
      options={options}
      optionRender={(option) => (
        <Space>
          <span role="img" aria-label={option.data.label}>
            {option.data.emoji}
          </span>
          {option.data.desc}
        </Space>
      )}
    />
    <Select
      showSearch
      placeholder="Select a person"
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
      options={[
        { value: "1", label: "Jack" },
        { value: "2", label: "Lucy" },
        { value: "3", label: "Tom" },
      ]}
    />
    <Input placeholder="CivitAI Token" prefix={<KeyOutlined />} />
  </div>
);

function SearchBar() {
  return (
    <Popover
      content={AdvancedSearchOpts}
      title="Advanced Search Options"
      trigger="hover"
    >
      <Search
        style={searchBarStyle}
        placeholder="input search text"
        enterButton="Search"
        size="large"
        loading
      />
    </Popover>
  );
}

const App = () => (
  <div>
    <Layout style={layoutStyle}>
      <Content style={contentStyle}>content</Content>
      <Footer style={footerStyle}>
        <SearchBar></SearchBar>
      </Footer>
    </Layout>
  </div>
);

export default App;
