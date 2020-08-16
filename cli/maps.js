const { GOOGLE_MAPS_API_KEY } = require('dotenv').config().parsed
const { Client, UnitSystem, TravelMode } = require("@googlemaps/google-maps-services-js");
const { promises: fs } = require("fs")
const houses = require("../data/houses.json")
const family = require("../data/family.json")

// execute
main()

async function main() {

    let distances = []

    for (let i = 0; i < houses.length; i++) {
        let house = houses[i];

        let dist = {
            address: house.address,
            family: []
        }

        for (let j = 0; j < family.length; j++) {
            let fam = family[j];

            let client = new Client({});

            try {
                let response = await client.distancematrix({
                    params: {
                        origins: [house.address],
                        destinations: [fam.address],
                        mode: TravelMode.driving,
                        units: UnitSystem.imperial,
                        key: GOOGLE_MAPS_API_KEY
                    }
                })

                let { distance, duration } = response.data.rows[0].elements[0]

                dist.family.push({ name: fam.name, distance, duration })


            } catch (error) {
                console.log(error)
            }

        }

        distances.push(dist)

    }

    let output = JSON.stringify(distances, null, 2)
    await fs.writeFile("./data/distances.json", output, "utf-8")

}