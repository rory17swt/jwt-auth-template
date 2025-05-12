export class UnprocessableEntity extends Error {
    constructor(message, field = 'message') {
        super(message)
        this.name = 'UnprocessableEntity'
        this.status = 422
        this.field = field
    }
}


export class Unauthorized extends Error {
    constructor(message = 'Unauthorized'){
        super(message)
        this.name = 'Unauthorized'
        this.status = 401
        this.field = field
    }
}

export class NotFound extends Error {
    constructor(message = 'Not Found'){
        super(message)
        this.name = 'notFound'
        this.status = 404
        this.field = 'message'
    }
}

export class Forbidden extends Error {
  constructor(message = 'You do not have permission to access this resource'){
    super(message)
    this.name = 'Forbidden'
    this.status = 403
    this.field = 'message'
  }
}