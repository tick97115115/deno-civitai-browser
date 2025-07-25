import {
  Checkbox,
  Col,
  type GetProp,
  Input,
  Popover,
  Row,
  Select,
  Space,
} from "antd";
import { KeyOutlined } from "@ant-design/icons";

const { Search } = Input;

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
  <Space direction="vertical" size="small" style={searchBarPopoverStyle}>
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Checkbox.Group
          options={plainOptions}
          defaultValue={["Apple"]}
          onChange={onChange}
          style={searchBarStyle}
        />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Select
          mode="multiple"
          style={searchBarStyle}
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
      </Col>
    </Row>
    <Row>
      <Col>
        <Select
          style={searchBarStyle}
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
      </Col>
    </Row>
    <Row>
      <Col>
        <Input
          placeholder="CivitAI Token"
          prefix={<KeyOutlined />}
          style={searchBarStyle}
        />
      </Col>
    </Row>
  </Space>
);

function SearchBar() {
  return (
    <>
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
    </>
  );
}

export default SearchBar;
