const path = require('path')
const fs = require('fs')
'use strict';
let path1 = path.join(__dirname,'../category-images');

console.log(path1,'_____________I1________________')

const image1 = fs.readFileSync(path1+"/olx_car.png");
const image2 = fs.readFileSync(path1+"/olx_furniture.png")
const image3 = fs.readFileSync(path1+"/olx_shoes.png")

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  
  up: (queryInterface, Sequelize) => {
    let path1 = path.join(__dirname,'../category-images');

    console.log(path1,'_____________I1________________')

    const car_image = fs.readFileSync(path1+"/olx_car.png");
    const furniture_image = fs.readFileSync(path1+"/olx_furniture.png")
    const shoes_image = fs.readFileSync(path1+"/olx_shoes.png")

   return queryInterface.bulkInsert('Olx_Categories', [
     {
       category_id: 'VEHICLES',
       category_name: 'Vehicles',
       category_image: car_image,
       parent_id:null,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      category_id: '2WHEELER',
      category_name: 'Two Wheelers',
      category_image: null,
      parent_id:'VEHICLES',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      category_id: '4WHEELER',
      category_name: 'Four Wheelers',
      parent_id:'VEHICLES',
      category_image: car_image,
      createdAt: new Date(),
      updatedAt: new Date()
     }

   ]);
 }
,

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
