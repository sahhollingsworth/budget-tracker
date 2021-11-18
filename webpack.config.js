const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    entry: "/public/assets/js/index.js",
    output: {
        path: __dirname + "/public/dist",
        filename: "bundle.js"
    },
    mode: "development",
    plugins: [
        new WebpackPwaManifest({
            // the name of the generated manifest file
            filename: "manifest.json",

            // Webpack isn't being used to generate html
            inject: false,

            fingerprints: false,

            name: "Budget Tracker App",
            short_name: "Budget App",
            description: "An application that allows you to dynamically track your budget",
            theme_color: "#ffffff",
            background_color: "#ffffff",
            start_url: "/",
            display: "standalone",
                icons: [
                    {
                    src: path.resolve( __dirname, "public/assets/icons/icon-512x512.png"),
                    // generate an image for each size in the size array
                    size: '512x512'
                    },
                    {
                    src: path.resolve( __dirname, "public/assets/icons/icon-192x192.png"),
                    size: '192x192'
                    }
                ]
        })
    ]
};

module.exports = config;