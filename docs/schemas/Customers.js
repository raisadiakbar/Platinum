module.exports = {
    Customers: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64"
          },
          user_id: {
            type: "string"
          },
          name: {
            type: "string"
          }, 
          email: {
            type: "string"
          },
          age: {
            type: "integer"
          },
          userStatus: {
            type: "integer",
            format: "int32",
            description: "Customer Status"
          }
        },
    }
}
