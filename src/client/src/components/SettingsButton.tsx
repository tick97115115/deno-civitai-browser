import { Button, Col, Input, message, Popover, Row, Select, Space } from "antd";
import {
  KeyOutlined,
  ReloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { orpc } from "../orpc.ts";

const SettingsPopoverStyle: React.CSSProperties = {
  maxWidth: "400px",
  width: "40dvw",
  minWidth: "200px",
};

async function scan() {
  const [messageApi, contextHolder] = message.useMessage();
  const res = await orpc.models.scanLocalModelsRoute();
  return messageApi.open({
    type: "success",
    content: `Total ${res.new_models_count} models have been add.`,
  });
}
function SettingsPopover() {
  return (
    <Space direction="vertical" size="small" style={SettingsPopoverStyle}>
      <Row>
        <Col>
          <Select
            style={SettingsPopoverStyle}
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
            style={SettingsPopoverStyle}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            size="large"
            onClick={async () => {
              await orpc.models.scanLocalModelsRoute();
            }}
          />
        </Col>
      </Row>
    </Space>
  );
}

function SettingsButton() {
  return (
    <Popover
      content={SettingsPopover}
      title="App Settings"
      trigger="hover"
    >
      <Button type="primary" icon={<SettingOutlined />} size="large" />
    </Popover>
  );
}

export default SettingsButton;
