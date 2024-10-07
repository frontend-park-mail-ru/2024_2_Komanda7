import globals from "globals";
//import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.browser
    },
    ignores: ["public/modules/dompurify.js",
      "server/*",
    ]
  },

  //pluginJs.configs.recommended,

  {
    rules: {
      "no-multiple-empty-lines": [1, { "max": 1 }]
    },
    ignores: ["public/modules/dompurify.js",
      "server/*",           
]
  },
  
];
