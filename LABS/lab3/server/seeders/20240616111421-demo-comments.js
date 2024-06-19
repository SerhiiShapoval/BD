module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [{
      content: 'Is the iPhone still available?',
      userId: 2,
      adId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      content: 'What are the dimensions of the sofa?',
      userId: 1,
      adId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
