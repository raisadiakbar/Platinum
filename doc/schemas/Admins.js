module.exports = {
    Admins: {
        type: "object",
        properties: {
            id: {
                type: "uuid",
                format: "uuid"
            },
            name: {
                type: "string"
            },
            email: {
                type: "string"
            },
            password: {
                type: "string"
            },
            role: {
                type: "integer"
            }
        },
        required: ["name", "email", "password", "role"]
    }
}