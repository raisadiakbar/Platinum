module.exports = {
    Sellers: {
        type: "object",
        properties: {
          id: {
            type: "uuid"
          },
          name: {
            type: "string"
          },
          email: {
            "type": "string"
          },
          password: {
            "type": "string"
          },
        },
      }
}
