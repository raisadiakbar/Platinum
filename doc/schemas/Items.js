module.exports = {
    Items: {
        type: "object",
        properties: {
          id: {
            type: "uuid"
          },
          name: {
            type: "string"
          },
          price: {
            type: "integer",
            format: "int64"
          },
          store_name: {
            "type": "string"
          },
          category: {
            "type": "string"
          },
          brand: {
            "type": "string"
          },
        }
    }
}