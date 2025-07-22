import { orpc } from "../orpc.ts";

function SettingDisplay() {
  return (
    <div>
      <h2>Settings</h2>
      <button
        type="button"
        onClick={async () => {
          const settings = await orpc.settings.getSettings();
          console.log("Current Settings:", settings);
        }}
      >
        Get Settings
      </button>
      {
        /* <button
        onClick={async () => {
          const newSetting = await client.settings.newSettings({ key: "example", value: "value" });
          console.log("New Setting Created:", newSetting);
        }}
      >
        Create New Setting
      </button> */
      }
    </div>
  );
}

export default SettingDisplay;
