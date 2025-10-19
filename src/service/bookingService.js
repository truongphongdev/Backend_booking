import { where } from "sequelize";
import db from "../models/index.cjs";

// create new one booking
const createBooking = async (dataBooking) => {
  try {
    let {
      typeBooking,
      dateBooking,
      timeBooking,
      note,
      doctorId,
      patientId,
      scheduleId,
      clinicId,
    } = dataBooking;
    let newBooking = await db.Booking.create({
      typeBooking: typeBooking,
      dateBooking: dateBooking,
      timeBooking: timeBooking,
      note: note,
      doctorId: doctorId,
      patientId: patientId,
      scheduleId: scheduleId,
      clinicId: clinicId,
    });
    return {
      EM: "Create Booking Successfully",
      EC: 0,
      DT: newBooking,
    };
  } catch (error) {
    console.log(">>>>>>>> error create new booking ", error);
    return {
      EM: "Error cannot create new appointment",
      EC: 1,
      DT: "",
    };
  }
};

// get all booking
const getAllBooking = async () => {
  try {
    let listBooking = await db.Booking.findAll({
      include: [
        {
          model: db.User,
          as: "patient",
          attributes: ["id", "fullName", "email", "phoneNumber"],
        },
        {
          model: db.User,
          as: "doctor",
          attributes: ["id", "fullName", "email", "phoneNumber"],
        },
        {
          model: db.Schedule,
          attributes: ["id", "timeStart", "timeEnd"],
        },
        {
          model: db.Clinic,
          attributes: ["id", "address"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      EM: "Get list booking successfully",
      EC: 0,
      DT: listBooking,
    };
  } catch (error) {
    console.log(">>> error get booking service:", error);
    return {
      EM: "Error cannot get list booking for user",
      EC: 1,
      DT: "",
    };
  }
};

// get booking by id
const getBookingById = async (bookingId) => {
  try {
    const Id = bookingId.params.id;
    const booking = await db.Booking.findOne({
      where: { id: Id },
      include: [
        {
          model: db.User,
          as: "patient",
          attributes: ["id", "fullName", "email", "phoneNumber"],
        },
        {
          model: db.User,
          as: "doctor",
          attributes: ["id", "fullName", "email", "phoneNumber"],
        },
        {
          model: db.Schedule,
          attributes: ["id", "timeStart", "timeEnd"],
        },
        {
          model: db.Clinic,
          attributes: ["id", "address"],
        },
      ],
    });
    return {
      EM: "Get booking by id successfully.",
      EC: 0,
      DT: booking,
    };
  } catch (error) {
    console.log(">>>>>>>>> error : get booking by id, ", error);
    return {
      EM: "Error get booking by id.",
      EC: 1,
      DT: "",
    };
  }
};

// update booking
const updateBookingId = async (bookingId, newData) => {
  try {
    const id = bookingId.params.id;

    const newBooking = await db.Booking.update(newData, {
      where: { id: id },
    });
    return {
      EM: "Edit Booking successfully.",
      EC: 0,
      DT: newBooking,
    };
  } catch (error) {
    console.log(">>>>>>>>> error : update booking, ", error);
    return {
      EM: "Error when update booking.",
      EC: 1,
      DT: "",
    };
  }
};

// delete booking
const deleteBookingId = async (bookingId) => {
  try {
    const id = bookingId.params.id;
    const deleteBooking = db.Booking.destroy({
      where: { id: id },
    });
    return {
      EM: "Delete Booking successfully.",
      EC: 0,
      DT: deleteBooking,
    };
  } catch (error) {
    console.log(">>>>>>>>> error : delete booking, ", error);
    return {
      EM: "Error when update booking.",
      EC: 1,
      DT: "",
    };
  }
};
export {
  createBooking,
  getAllBooking,
  getBookingById,
  updateBookingId,
  deleteBookingId,
};
