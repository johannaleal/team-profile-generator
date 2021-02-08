const Employee = require("../Employee");

describe("Employee", () => {
    describe("Initialize", () => {
        // should have a first name and a last name
        it("should have a first name, last name, position, salary, id, email", () => {
            // arrange/act
            const employee = new Employee("Jim", "Haynes");

            // assert
            expect("firstName" in employee).toEqual(true);
            expect("lastName" in employee).toEqual(true);
            expect("position" in employee).toEqual(true);
            expect("salary" in employee).toEqual(true);
            expect("id" in employee).toEqual(true);
            expect("email" in employee).toEqual(true);
        })
        // should not have a missing first or last name
        it("should not have a missing first or last name", () => {
            const employee = new Employee("Jim", "Haynes");

            expect(employee.firstName).not.toEqual(undefined);
            expect(employee.lastName).not.toEqual(undefined);
        });

        // should have an id assigned when they are created
        it("should have an id assigned when they are created", () => {
            const employee = new Employee("Jim", "Haynes", "Manager", 100000);

            expect(employee.id).not.toEqual(undefined);
            expect(typeof employee.id).toEqual("number");

        })
        // should have a default email created based on their first and last name if they don't enter an email

        
    })
})

