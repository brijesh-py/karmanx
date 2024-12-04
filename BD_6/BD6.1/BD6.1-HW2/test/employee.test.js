const { getEmployeeById, getEmployees, addEmployee } = require("../employee");

describe("Employees Functions", () => {
  // Exercise 4: Test get all Employees
  it("should be get all employees", () => {
    const employees = getEmployees();
    expect(employees?.length).toBe(4);
    expect(employees).toEqual([
      { id: 1, name: "John Doe", position: "Software Engineer" },
      { id: 2, name: "Jane Smith", position: "Product Manager" },
      { id: 3, name: "Sam Johnson", position: "Designer" },
      { id: 4, name: "Lisa Brown", position: "DevOps Engineer" },
    ]);
  });

  // Exercise 5: Test get Employee by ID
  it("should be get a Employee by ID", () => {
    const employee = getEmployeeById(4);
    expect(employee).toEqual({
      id: 4,
      name: "Lisa Brown",
      position: "DevOps Engineer",
    });
  });

  //  Exercise 6: Test get Employee by non-existent ID
  it("Should be return undefined by out-of-range Employee ID", () => {
    expect(getEmployeeById(5)).toEqual(undefined);
    expect(getEmployeeById(12)).toEqual(undefined);
  });

  //   Exercise 7: Test add new Employee
  it("Should be return New Employee", () => {
    const employee = addEmployee({
      name: "Saim",
      position: "HR",
    });
    expect(employee).toEqual({
      id: 5,
      name: "Saim",
      position: "HR",
    });
    expect(getEmployees().length).toBe(5);
  });
});
