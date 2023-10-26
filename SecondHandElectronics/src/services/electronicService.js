const Electronic = require("../models/Electronic");

// create new electronic
exports.create = (electronicData) => Electronic.create(electronicData);

// get all electronics
exports.getAll = () => Electronic.find().lean();

// get single device (details page)
exports.getSingleElectronic = (electronicId) =>
  Electronic.findById(electronicId);

//   Edit
exports.update = (electronicId, electronicData) =>
  Electronic.findByIdAndUpdate(electronicId, electronicData);

//   Delete
exports.delete = (electronicId) => Electronic.findByIdAndDelete(electronicId);

// Buy
exports.buy = async (electronicId, userId) => {
  const electronic = await this.getSingleElectronic(electronicId);
  const hasBought = electronic.buyingList.some(
    (buyer) => buyer?.toString() === userId
  );

  if (hasBought) {
    return;
  }

  electronic.buyingList.push(userId);
  return electronic.save();
};

// get all electronics
exports.search = async (searchName, searchType) => {
  let filtered = await Electronic.find().lean();

  if (searchName) {
    filtered = filtered.filter((electronic) =>
      electronic.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }

  if (searchType) {
    filtered = filtered.filter((electronic) =>
      electronic.type.toLowerCase().includes(searchType.toLowerCase())
    );
  }

  return filtered;
};
