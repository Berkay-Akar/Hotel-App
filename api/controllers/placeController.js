const Place = require("../models/Place");

// Adds a place in the DB
exports.addPlace = async (req, res) => {
  try {
    const userData = req.user;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
    } = req.body;
    const place = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
    });
    res.status(200).json({
      place,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

// Returns user specific places
exports.userPlaces = async (req, res) => {
  try {
    const userData = req.user;
    const id = userData.id;
    res.status(200).json(await Place.find({ owner: id }));
  } catch (err) {
    res.status(500).json({
      message: "Internal serever error",
    });
  }
};

// Updates a place
exports.updatePlace = async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
    } = req.body;

    const place = await Place.findById(id);
    if (userId === place.owner.toString()) {
      place.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        maxGuests,
        price,
      });
      await place.save();
      res.status(200).json({
        message: "place updated!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

// Returns all the places in DB
exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json({
      places,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Returns all the maxGuests in DB
exports.getMaxGuests = async (req, res) => {
  try {
    const maxGuests = await Place.find({
      maxGuests: { $type: "string" },
    }).distinct("maxGuests");
    res.status(200).json({
      maxGuests,
    });
    console.log("maxGuests", maxGuests);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Returns single place, based on passed place id
exports.singlePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);
    if (!place) {
      return res.status(400).json({
        message: "Place not found",
      });
    }
    res.status(200).json({
      place,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal serever error",
    });
  }
};

// Search Places in the DB
exports.searchPlaces = async (req, res) => {
  try {
    const searchword = req.params.key;

    if (searchword === "") return res.status(200).json(await Place.find());

    const searchMatches = await Place.find({
      address: { $regex: searchword, $options: "i" },
    });

    res.status(200).json(searchMatches);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal serever error 1",
    });
  }
};

// search endpoint with address and maxGuests
exports.search = async (req, res) => {
  try {
    const { address, maxGuests } = req.query;
    console.log("address", address);
    console.log("maxGuests", maxGuests);
    // Convert maxGuests to a number
    const maxGuestsNumber = parseInt(maxGuests, 10);

    // Check if the conversion was successful
    if (isNaN(maxGuestsNumber)) {
      return res.status(400).json({
        message: "maxGuests must be a valid number",
      });
    }

    const places = await Place.find({
      address: { $regex: address, $options: "i" },
      maxGuests: { $gte: maxGuestsNumber }, // Use $gte (greater than or equal) for numeric comparison
    });

    res.status(200).json({
      places,
    });
  } catch (err) {
    console.log("ERRORRR", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
