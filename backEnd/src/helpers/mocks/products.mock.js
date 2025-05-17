import { faker } from "@faker-js/faker";
faker.locale = 'es'

const createMockProduct = () => {
    const categories = ["Tablets", "Smartphones", "Laptops", "Smartwatches", "Headphones", "Speakers", "Desktops", "Streaming Devices", "Keyboards", "Accessories", "Virtual Reality", "Fitness", "Cameras", "Gaming", "Televisions", "Soundbars"]
    const title = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const category = categories[faker.number.int({ min: 0, max: categories.length - 1 })];
    const image = faker.image.urlLoremFlickr({ category: 'nature', width: 360, height: 360 });
    const price = Number.parseInt(faker.commerce.price({ min : 10, max : 2000}));
    const stock = faker.number.int({ min: 1, max: 1000 });
    return {title, description, category, image, price, stock}
}

//console.log(createMockProduct());

export default createMockProduct;