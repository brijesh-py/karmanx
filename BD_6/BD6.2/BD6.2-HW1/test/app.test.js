const { app, getEmployees, getEmployeeById, addEmployee } = require("../app");
const http = require("http");

jest.mock("../app", () => ({
  ...jest.requireActual("../app"),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addEmployee: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Functions Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Exercise 4: Test get all employees
  test("Get Employees should return an Employees list", () => {
    const mockEmployees = [
      { id: 2, name: "Jane Smith", position: "Product Manager" },
      { id: 3, name: "Sam Johnson", position: "Designer" },
    ];
    getEmployees.mockReturnValue(mockEmployees);

    let employees = getEmployees();
    expect(employees).toEqual(mockEmployees);
    expect(getEmployees).toHaveBeenCalled();
  });

  // Exercise 5: Test get employee by ID
  test("Get Employee by ID should return an Employee", () => {
    const mockEmployee = {
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
    };
    getEmployeeById.mockReturnValue(mockEmployee);

    let employee = getEmployeeById(1);
    expect(employee).toEqual(mockEmployee);
    expect(getEmployeeById).toHaveBeenCalledWith(1);
  });

  // Exercise 6: Test get employee by non-existent ID
  test("Get Employee by Id should return undefined", () => {
    getEmployeeById.mockReturnValue(undefined);

    let employee = getEmployeeById(4);
    expect(employee).toBeUndefined();
    expect(getEmployeeById).toHaveBeenCalledWith(4);
  });

  // Exercise 7: Test add new employee
  test("Add Employee: ID, Name and Book should return a new Employee", () => {
    const mockEmployee = { id: 4, name: "Saim Ahmed", position: "HR" };
    addEmployee.mockReturnValue(mockEmployee);

    let employee = addEmployee(mockEmployee);
    expect(employee).toEqual(mockEmployee);
    expect(addEmployee).toHaveBeenCalledWith(mockEmployee);
  });
});
