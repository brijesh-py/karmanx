const { DataTypes, sequelize } = require("../lib");
const Student = require("./student.model");
const Course = require("./course.model");

const StudentCourse = sequelize.define("student_courses", {
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: "id",
    },
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: "id",
    },
  },
});

Student.belongsToMany(Course, { through: StudentCourse });
Course.belongsToMany(Student, { through: StudentCourse });

module.exports = StudentCourse;
