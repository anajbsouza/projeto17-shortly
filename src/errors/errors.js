function conflictError() {
    return {
        name: 'ConflictError',
        message: `There's a conflict!`,
    };
}

function notFoundError() {
    return {
        name: 'NotFoundError',
        message: `Information not found!`,
    };
}

function unauthorizedError() {
    return {
        name: 'UnauthorizedError',
        message: 'You do not have permission to access this information',
    };
}

function unprocessableEntity() {
    return {
        name: 'UnprocessableError',
        message: 'Not possible to process this information',
    };
}

export const errors = {
    conflictError,
    notFoundError,
    unauthorizedError,
    unprocessableEntity
}