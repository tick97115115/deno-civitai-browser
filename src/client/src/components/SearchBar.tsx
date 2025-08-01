import {
  Checkbox,
  type CheckboxProps,
  Col,
  type GetProp,
  Input,
  Popover,
  Row,
  Select,
  Space,
} from "antd";
import { atom, useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";
const { Search } = Input;
import {
  BaseModelsArray,
  ModelsRequestPeriodArray,
  ModelsRequestSortArray,
  ModelTypesArray,
} from "../../../shared/models/civitai/mod.ts";

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

const loadingAtom = atom(false);

type UsernameOption = {
  username: string;
};
const usernameOptions: Array<UsernameOption> = [];
const immerUsernameOptionsAtom = atomWithImmer(usernameOptions);
const handleUsernameChange = async (value: UsernameOption) => {
  const [usernameOptions, setUsernameOptions] = useAtom(
    immerUsernameOptionsAtom,
  );
  // Simulate an API call to fetch usernames
};

const nsfwOnChange: CheckboxProps["onChange"] = (e) => {
  console.log("nsfw = ", e.target.checked);
};
const favoritesOnChange: CheckboxProps["onChange"] = (e) => {
  console.log("favorites = ", e.target.checked);
};const hiddenOnChange: CheckboxProps["onChange"] = (e) => {
  console.log("hidden = ", e.target.checked);
};

const AdvancedSearchOpts = (
  <Space direction="vertical" size="small" style={searchBarPopoverStyle}>
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Checkbox onChange={nsfwOnChange}>Checkbox</Checkbox>
        <Checkbox onChange={favoritesOnChange}>Checkbox</Checkbox>
        <Checkbox onChange={hiddenOnChange}>Checkbox</Checkbox>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Select
          style={searchBarStyle}
          placeholder="Username"
          showSearch
          onChange={handleUsernameChange}
          options={usernameOptions}
          optionRender={(option) => (
            <Space>
              {option.data.username}
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
          mode="multiple"
          placeholder="Model Type"
          options={ModelTypesArray.map((model: string) => ({
            label: model,
            value: model,
          }))}
          optionFilterProp="label"
        />
      </Col>
    </Row>
    <Row>
      <Col>
        <Select
          style={searchBarStyle}
          showSearch
          mode="multiple"
          placeholder="Base Model Type"
          options={BaseModelsArray.map((model: string) => ({
            label: model,
            value: model,
          }))}
          optionFilterProp="label"
        />
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <Select
          style={{ width: "100%" }}
          placeholder="Sort"
          showSearch
          onChange={handleUsernameChange}
          options={ModelsRequestSortArray.map((sort: string) => ({
            value: sort,
            label: sort,
          }))}
          optionFilterProp="label"
        />
      </Col>
      <Col span={12}>
        <Select
          style={{ width: "100%" }}
          placeholder="Period"
          showSearch
          onChange={handleUsernameChange}
          options={ModelsRequestPeriodArray.map((period: string) => ({
            value: period,
            label: period,
          }))}
          optionFilterProp="label"
        />
      </Col>
    </Row>
  </Space>
);

function SearchBar() {
  const [loading, setLoading] = useAtom(loadingAtom);

  return (
    <>
      <Popover
        content={AdvancedSearchOpts}
        title="Advanced Search Options"
        trigger="hover"
      >
        <Search
          style={searchBarStyle}
          placeholder="Search"
          enterButton="Search"
          size="large"
          loading={loading}
          onSearch={() => {
            console.log("Search triggered");
            setLoading(true);
          }}
        />
      </Popover>
    </>
  );
}

export default SearchBar;
