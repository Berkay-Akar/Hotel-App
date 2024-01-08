const Booking = require("../models/Booking");

// Books a place
exports.createBookings = async (req, res) => {
  try {
    const userData = req.user;
    const { place, checkIn, checkOut, numOfGuests, name, phone, price } =
      req.body;
    // check if user is logged in
    if (!userData) {
      throw new Error("You are not authorized to access this page!");
    }
    //check checkIn and checkOut dates
    if (checkIn > checkOut) {
      throw new Error("Check-in date must be before check-out date!");
    }
    //check if checkIn and checkOut dates are in the past
    if (checkIn < Date.now() || checkOut < Date.now()) {
      throw new Error("Check-in and check-out dates must be in the future!");
    }
    //check if booking already exists
    const existingBooking = await Booking.findOne({
      user: userData.id,
      place: place,
    });
    if (existingBooking) {
      throw new Error("You have already booked this place!");
    }
    //check if place is available
    const bookings = await Booking.find({ place: place });
    for (let i = 0; i < bookings.length; i++) {
      if (
        (checkIn >= bookings[i].checkIn && checkIn <= bookings[i].checkOut) ||
        (checkOut >= bookings[i].checkIn && checkOut <= bookings[i].checkOut)
      ) {
        throw new Error("Place is not available!");
      }
    }

    const booking = await Booking.create({
      user: userData.id,
      place,
      checkIn,
      checkOut,
      numOfGuests,
      name,
      phone,
      price,
    });

    res.status(200).json({
      booking,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: err,
    });
  }
};

// Returns user specific bookings
exports.getBookings = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res
        .status(401)
        .json({ error: "You are not authorized to access this page!" });
    }

    const booking = await Booking.find({ user: userData.id }).populate("place");

    res.status(200).json({ booking, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};
