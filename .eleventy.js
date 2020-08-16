module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("favicon.ico");

    return {
        dir: {
            "data": "data",
            "includes": "assets",
            "layouts": "layouts"
        },
    };
};