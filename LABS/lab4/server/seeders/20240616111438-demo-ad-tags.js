module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('AdTags', [{
      adId: 1,
      tagId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      adId: 2,
      tagId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AdTags', null, {});
  }
};
