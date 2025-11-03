module.exports = {
  presets: ['module:@react-native/babel-preset'],
  "plugins": [
    ["module:react-native-dotenv", {
      "moduleName": "@env", // Optional: Custom module name for importing
      "path": ".env", // Optional: Path to your .env file
      "safe": false, // Optional: Load .env.example if .env is missing
      "allowUndefined": true // Optional: Allow undefined variables
    }]
  ]
};
