const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    entry: "/public/assets/js/index.js",
    output: {
        path: __dirname + "/public/dist",
        filename: "bundle.js"
    },
    mode: "production",
    plugins: [
        new WebpackPwaManifest({
            // the name of the generated manifest file
            filename: "manifest.json",

            // Webpack isn't being used to generate html
            inject: false,

            // Makes the names of the generated files predictable & easier to refer to them in app code
            fingerprints: false,

            name: "Budget Tracker App",
            short_name: "Budget App",
            theme_color: "#ffffff",
            background_color: "#ffffff",
            start_url: "/",
            display: "standalone",
                icons: [
                    {
                    src: path.resolve( __dirname, "public/assets/images/icons/icon-512x512.png"),
                    // generate an image for each size in the size array
                    size: [72, 96, 128, 144, 152, 192, 384, 512]
                    },
                    {
                    src: path.resolve( __dirname, "public/assets/images/icons/icon-192x192.png"),
                    size: [72, 96, 128, 144, 152, 192, 384, 512]
                    }
                ]
        })
    ]
};

module.exports = config;