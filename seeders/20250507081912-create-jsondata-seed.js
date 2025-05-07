'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    const response = await fetch('http://jsonplaceholder.typicode.com/posts');
    const apiData = await response.json()
    const mappedData = apiData.map(({ id, ...rest }) => ({
      ...rest,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    await queryInterface.bulkInsert('Jsondata', mappedData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
