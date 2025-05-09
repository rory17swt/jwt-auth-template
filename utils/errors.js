class UnprocessableEntity extends Error {
    constructor(message, field) {

        super(message)

        this.name = 'UnprocessableEntity'
        this.status = 422
        this.field = field
    }
}

const error1 = new UnprocessableEntity('Email already taken', 'email')
const error2 = new UnprocessableEntity('This username already exsits', 'username')
const error3 = new UnprocessableEntity('Passwords do not match', 'password')