class Employee {
    constructor(firstName, lastName, position, salary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.salary = salary;
        this.id = 1;
        this.email = `${this.firstName}.${this.lastName}@truecorp.com`;
    }

}

module.exports = Employee;