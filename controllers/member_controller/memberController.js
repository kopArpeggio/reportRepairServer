const { Member, sequelize } = require("../../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// ค้นหาสมาชิกทั้งหมด
exports.getAllMember = async (req, res, next) => {
  try {
    // ค้นหาสมาชิกทั้งหมดและเก็บไว้ใน members
    const members = await Member.findAll();

    // ส่งค่ากลับ
    res
      .status(200)
      .send({ message: "Get All Members Succesful.", data: members });
  } catch (error) {
    // กำหนดค่าให้ error
    error.controller = "getAllMember";
    // ส่งค่า error กลับ
    next(error);
  }
};

// สร้างสมาชิก
exports.createMember = async (req, res, next) => {
  // กำหนด Transaction
  const t = await sequelize.transaction();
  const { password, username } = req?.body;

  try {
    // ค้นหาสมาชิกที่ซ้ำกัน
    const duplicate = await Member.findOne({
      where: { [Op.or]: { username, email: req?.body?.email } },
    });

    // เช็คสมาขิกที่ซ้ำกัน
    if (duplicate) {
      const error = new Error("This user already Exist !");
      error.statusCode = 400;
      throw error;
    }

    // ห่อหุ้ม Password
    const hasedPassword = await bcrypt.hash(password, 10);

    // สร้างสมาชิก
    const member = await Member.create(
      {
        ...req.body,
        password: hasedPassword,
      },
      { transaction: t }
    );

    // Commit Transaction
    await t.commit();

    // ส่งค่ากลับไป
    res.status(201).send({ message: "Register Succesful.", data: member });
  } catch (error) {
    // Rollback Transaction
    await t.rollback();

    // กำหนดค่าให้ error
    error.controller = "createMember";

    // ส่งค่า error กลับ
    next(error);
  }
};

// ลบสมาชิกโดยใช้ Id
exports.deleteMemberById = async (req, res, next) => {
  // กำหนด Transaction
  const t = await sequelize.transaction();
  const { id } = req?.params;
  try {
    // ค้นหาสมาชิก
    const exist = await Member.findOne({ where: { id } });

    // เช็คว่าสมาชิกนี้มีอยู่จริงไหม
    if (!exist) {
      const error = new Error("This Member not exist !");
      error.statusCode = 400;
      throw error;
    }

    // ลบสมาชิก
    await Member.delete({ transaction: t, where: { id } });

    // Commit Transaction
    await t.commit();

    // ส่งค่ากลับ
    res.status(200).send({ message: "Delete member by Id Successful." });
  } catch (error) {
    // Rollback Transaction
    await t.rollback();
    // กำหนดค่าให้ error
    error.controller = "deleteMemberById";
    // ส่งค่า error กลับ
    next(error);
  }
};

// อัพเดท สมาชิกโดยใช้ Id
exports.updateMemberById = async (req, res, next) => {
  // กำหนด Transaction
  const t = await sequelize.transaction();

  const { id } = req?.params;

  try {
    // ค้นหา ว่ามี่สมาชิกที่ซ้ำกันไหม
    const exist = await Member.findOne({ where: { id } });

    if (!exist) {
      const error = new Error("This Member not exist !");
      error.statusCode = 400;
      throw error;
    }

    // อัพเดทสมาชิก
    await Member.update(
      {
        ...req.body,
      },
      {
        transaction: t,
        where: { id },
      }
    );

    // Commit Transaction
    await t.commit();

    // ส่งค่ากลับ
    res.status(200).send({ message: "Update member by Id Successful." });
  } catch (error) {
    // Rollback Transaction
    await t.rollback();
    // กำหนดค่่าให้ error
    error.controller = "updateMemberById";
    // ส่งค่า error กลับ
    next(error);
  }
};
