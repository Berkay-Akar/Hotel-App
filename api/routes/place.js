const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/user");

const {
  addPlace,
  getPlaces,
  updatePlace,
  singlePlace,
  userPlaces,
  searchPlaces,
  search,
  getMaxGuests,
} = require("../controllers/placeController");

router.route("/").get(getPlaces);
// Protected routes (user must be logged in)
router.route("/add-places").post(isLoggedIn, addPlace);
router.route("/user-places").get(isLoggedIn, userPlaces);
router.route("/update-place").put(isLoggedIn, updatePlace);
router.route("/getMaxGuests").get(isLoggedIn, searchPlaces);
router.route("/getPlaces").get(isLoggedIn, getMaxGuests);
router.route("/search").get(isLoggedIn, search);

// Not Protected routed but sequence should not be interfered with above routes
router.route("/:id").get(singlePlace);
router.route("/search/:key").get(searchPlaces);

module.exports = router;
