module.exports = {
    Users: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64"
          },
          name: {
            type: "string"
          },
          EMail: {
            "type": "string"
          },
          Password: {
            "type": "string"
          },
          Telephone: {
            "type": "integer"
          },
          Address: {
            "type": "string"
          },
          userStatus: {
            type: "integer",
            format: "int32",
            description: "User Status"
          }
        },
      }
}
