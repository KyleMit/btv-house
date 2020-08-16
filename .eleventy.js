module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("favicon.ico");

    eleventyConfig.addCollection("homes", (col) => {
        let { houses, distances } = col.items[0].data

        houses.forEach(house => {
            let dist = distances.find(d => d.address === house.address)
            house.family = dist.family
        })

        return houses;
    });

    return {
        dir: {
            "data": "data",
            "includes": "assets",
            "layouts": "layouts"
        },
    };
};