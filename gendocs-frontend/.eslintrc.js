module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "prettier/react"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    ignorePatterns: [
        "*.config.[j|t]s"
    ],
    rules: {
        "indent": [
            "error",
            4,
            {
                SwitchCase: 1
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "quote-props": [
            "error",
            "consistent-as-needed"
        ],
        "react/react-in-jsx-scope": "off",
        "eol-last": [
            "error",
            "always"
        ],
        "react/prop-types": "off",
    }
};
