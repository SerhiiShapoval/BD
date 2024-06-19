module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ads', [{
      title: 'iPhone 12 for sale',
      description: 'Almost new iPhone 12, 64GB, black.',
      price: 799.99,
      userId: 1,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Sofa in good condition',
      description: 'Comfortable sofa, barely used.',
      price: 300.00,
      userId: 2,
      categoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ads', null, {});
  }
};
