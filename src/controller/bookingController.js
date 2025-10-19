import {
  createBooking,
  getAllBooking,
  getBookingById,
  updateBookingId,
  deleteBookingId,
} from "../service/bookingService.js";

const handleCreateBooking = async (req, res) => {
  try {
    const dataBooking = req.body;
    const booking = await createBooking(dataBooking);
    res.status(200).json(booking);
  } catch (error) {
    console.log("Error when called create booking service!");
    res.status(500).json({ message: "Error Service" });
  }
};

const handleGetAllBooking = async (req, res) => {
  try {
    const booking = await getAllBooking();
    res.status(200).json(booking);
  } catch (error) {
    console.log("Error when called get all booking service!");
    res.status(500).json({ message: "Error Service" });
  }
};

const handleGetBookingById = async (req, res) => {
  try {
    const bk = await getBookingById(req);
    res.status(200).json(bk);
  } catch (error) {
    console.log("Error when called get booking by id");
    res.status(500).json({ message: "Error Service" });
  }
};

const handleUpdateBookingById = async (req, res) => {
  try {
    let newData = req.body;
    const bookingUpdate = await updateBookingId(req, newData);
    res.status(200).json(bookingUpdate);
  } catch (error) {
    console.log("Error when called update booking by id");
    res.status(500).json({ message: "Error Service" });
  }
};

const handleDeleteBookingById = async (req, res) => {
  try {
    const bookingDelete = await deleteBookingId(req);
    res.status(200).json(bookingDelete);
  } catch (error) {
    console.log("Error when called delete booking by id");
    res.status(500).json({ message: "Error Service" });
  }
};

export {
  handleCreateBooking,
  handleGetAllBooking,
  handleGetBookingById,
  handleUpdateBookingById,
  handleDeleteBookingById,
};
