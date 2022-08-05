const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62ead7544d84f603a5fdbf4e',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam illum sed voluptatem natus qui. Saepe, explicabo molestias nulla qui quas iure, ea omnis error beatae alias debitis, vel esse? Odio!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[rand1000].longitude,
                    cities[rand1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dgpjlx5vv/image/upload/v1659634866/YelpCamp/uxcfgpd1wzu0uvysvks3.jpg',
                    filename: 'YelpCamp/uxcfgpd1wzu0uvysvks3'
                },
                {
                    url: 'https://res.cloudinary.com/dgpjlx5vv/image/upload/v1659634865/YelpCamp/l1psycbtcmnqgs6goril.jpg',
                    filename: 'YelpCamp/l1psycbtcmnqgs6goril'
                }
            ]
        })
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})