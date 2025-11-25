export const adminOnly = (req, res, next) => {
  if (req.user.roleId !== 1) {
    return res
      .status(403)
      .json({ message: "Bạn không có quyền (Yêu cầu Admin)" });
  }
  next();
};

export const doctorOnly = (req, res, next) => {
  if (req.user.roleId !== 2) {
    return res
      .status(403)
      .json({ message: "Bạn không có quyền (Yêu cầu Bác sĩ)" });
  }
  next();
};

export const patientOnly = (req, res, next) => {
  if (req.user.roleId !== 3) {
    return res
      .status(403)
      .json({ message: "Bạn không có quyền (Yêu cầu Bệnh nhân)" });
  }
  next();
};

export const adminOrDoctor = (req, res, next) => {
  const role = req.user.roleId;
  if (role === 1 || role === 2) {
    next();
  } else {
    return res.status(403).json({ message: "Bạn không có quyền truy cập" });
  }
};
