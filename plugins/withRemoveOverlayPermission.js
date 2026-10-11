const { withAndroidManifest } = require("@expo/config-plugins");

module.exports = function withRemoveOverlayPermission(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;

    manifest["uses-permission"] =
      (manifest["uses-permission"] || []).filter(
        (permission) =>
          permission.$?.["android:name"] !==
          "android.permission.SYSTEM_ALERT_WINDOW"
      );

    return config;
  });
};