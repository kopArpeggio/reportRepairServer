const { FixList, sequelize } = require("../../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const uuidv4 = require("uuid");
const path = require("path");
const fs = require("fs");

// ค้นหาสมาชิกทั้งหมด
exports.getAllReportRepair = async (req, res, next) => {
  try {
    // ค้นหาสมาชิกทั้งหมดและเก็บไว้ใน members
    const list = await FixList.findAll();

    // ส่งค่ากลับ
    res.status(200).send({ message: "Get All Report Succesful.", data: list });
  } catch (error) {
    // กำหนดค่าให้ error
    error.controller = "getAllRepairs";
    // ส่งค่า error กลับ
    next(error);
  }
};

// สร้างสมาชิก
exports.createRepairReport = async (req, res, next) => {
  // กำหนด Transaction
  const t = await sequelize.transaction();

  try {
    if (req?.files) {
      var { picture } = req?.files;
    }

    if (picture) {
      //เก็บนามสกุลไฟล์
      const ext = path.extname(picture?.name).toLowerCase();

      //สุ่มชื่อไฟล์ใหม่
      var filename = `${uuidv4.v4()}${ext}`;

      //เก็บรูปไว้ในฝั่ง server
      picture?.mv(`${__dirname}/../../assets/img/${filename}`);
    }

    const report = await FixList.create(
      {
        ...req?.body,
        picture: filename,
      },

      { transaction: t }
    );

    // Commit Transaction
    await t.commit();

    // ส่งค่ากลับไป
    res
      .status(201)
      .send({ message: "Create Report Repair Succesful.", data: report });
  } catch (error) {
    // Rollback Transaction
    await t.rollback();

    // กำหนดค่าให้ error
    error.controller = "createRepairReport";

    // ส่งค่า error กลับ
    next(error);
  }
};

// ลบสมาชิกโดยใช้ Id
exports.deleteReportRepairById = async (req, res, next) => {
  // กำหนด Transaction
  const t = await sequelize.transaction();
  const { id } = req?.params;
  console.log(req?.params);
  try {
    // ค้นหาสมาชิก
    const exist = await FixList.findOne({ where: { id } });

    // เช็คว่าสมาชิกนี้มีอยู่จริงไหม
    if (!exist) {
      const error = new Error("This Member not exist !");
      error.statusCode = 400;
      throw error;
    }

    // ลบสมาชิก
    await FixList.destroy({ transaction: t, where: { id } });

    // Commit Transaction
    await t.commit();

    // ส่งค่ากลับ
    res.status(200).send({ message: "Delete member by Id Successful." });
  } catch (error) {
    // Rollback Transaction
    await t.rollback();
    // กำหนดค่าให้ error
    error.controller = "deleteReportRepairById";
    // ส่งค่า error กลับ
    next(error);
  }
};

// อัพเดท สมาชิกโดยใช้ Id
exports.updateReportRepairById = async (req, res, next) => {
  const item = req?.body;
  // console.log(item);
  // กำหนด Transaction
  const t = await sequelize.transaction();

  const { id } = req?.params;

  if (req?.files?.picture) {
    var { picture } = req?.files;
  }

  try {
    if (picture) {
      // ถ้ามีรูปภาพเดิมอยู่แล้วให้ลบออก
      if (item?.picture !== picture) {
        fs.unlink(`${__dirname}/../../assets/img/${item?.picture}`, (err) => {
          if (err) {
            console.log(err);
            return;
          }
        });

        // นามสกุลไฟล์
        const ext = path.extname(picture?.name).toLowerCase();

        // สุ่มชื่อไฟล์
        var filename = `${uuidv4.v4()}${ext}`;

        // ย้ายไฟล์ไปที่ server
        picture?.mv(`${__dirname}/../../assets/img/${filename}`);
      }
    }

    // ค้นหา ว่ามี่สมาชิกที่ซ้ำกันไหม
    const exist = await FixList.findOne({ where: { id } });

    if (!exist) {
      const error = new Error("This FixList not exist !");
      error.statusCode = 400;
      throw error;
    }

    // อัพเดทสมาชิก
    await FixList.update(
      {
        ...req?.body,
        picture: filename,
      },
      {
        transaction: t,
        where: { id },
      }
    );

    // Commit Transaction
    await t.commit();

    // ส่งค่ากลับ
    res.status(200).send({ message: "Update Report Repair by Id Successful." });
  } catch (error) {
    // Rollback Transaction
    await t.rollback();
    // กำหนดค่่าให้ error
    error.controller = "updateMemberById";
    // ส่งค่า error กลับ
    next(error);
  }
};
