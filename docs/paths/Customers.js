module.exports = {
    '/api/customer/addCustomer': {
        post: {
          tags: [
            "customer"
          ],
          summary: "Create customer",
          description: "This can only be done by logged in.",
          operationId: "addCustomer",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              in: "body",
              name: "body",
              description: "Created object",
              required: true,
              schema: {
                $ref: "#/components/schemas/Customers"
              }
            }
          ],
          responses: {
            200: {
              description: 'Success',
              content: {
                  'application/json': {
                      schema: {
                          $ref: '#/components/schemas/Customers'
                      }
                  }
              }
          },
          401: {
              description: 'Unauthorized',
          },
          500: {
              description: 'Internal server error',
          },
          security: [
          {
              binglestore_auth: [
                  "write:customers",
                  "read:customers" 
              ]
          }
      ]
          }
        }
      },
      '/api/customer/Customers': {
        get: {
          tags: ["customer"],
          summary: "Find all customer",
          description: "This can only be done by the logged in customer.",
          operationId: "getAll",
          produces: [
            "application/json"
          ],
          parameters: [],
          responses: {
            200: {
              description: 'Success',
              content: {
                  'application/json': {
                      schema: {
                          $ref: '#/components/schemas/Customers'
                      }
                  }
              }
          },
          401: {
              description: 'Unauthorized',
          },
          500: {
              description: 'Internal server error',
          },
          security: [
          {
              binglestore_auth: [
                  "write:customers",
                  "read:customers" 
              ]
          }
      ]}
        }
      },
      '/api/customer/Customers/{id}': {
        get: {
          tags: ["customer"],
          summary: "Find customer by id",
          description: "This can only be done by the logged in customer.",
          operationId: "getByID",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              description: "The ID of customer that needs to be showed",
              required: true,
              schema : {
                  type: 'integer',
                  format: 'int64',
              }
              }
          ],
          responses: {
            200: {
              description: 'Success',
              content: {
                  'application/json': {
                      schema: {
                          $ref: '#/components/schemas/Customers'
                      }
                  }
              }
          },
          401: {
              description: 'Unauthorized',
          },
          500: {
              description: 'Internal server error',
          },
          security: [
          {
              binglestore_auth: [
                  "write:customers",
                  "read:customers" 
              ]
          }
      ]}
        }
      },
      '/api/customer/updateCustomers': {
        put: {
          tags: ["customer"],
          summary: "Updated customer",
          description: "This can only be done by the logged in customer.",
          operationId: "updateCustomer",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              name: "customername",
              in: "path",
              description: "name that need to be updated",
              required: true,
              type: "string"
            },
            {
              in: "body",
              name: "body",
              description: "Updated customer object",
              required: true,
              schema: {
                $ref: "#/components/schemas/Customers"
              }
            }
          ],
          responses: {
            200: {
              description: 'Success',
              content: {
                  'application/json': {
                      schema: {
                          $ref: '#/components/schemas/Customers'
                      }
                  }
              }
          },
          401: {
              description: 'Unauthorized',
          },
          500: {
              description: 'Internal server error',
          },
          security: [
          {
              binglestore_auth: [
                  "write:customers",
                  "read:customers" 
              ]
          }
      ]
          }
        }
      },
      '/api/customer/deleteCustomers': {
        delete: {
          tags: [
            "customer"
          ],
          summary: "Delete Customer",
          description: "This can only be done by the logged in customer.",
          operationId: "deleteCustomer",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              name: "customername",
              in: "path",
              description: "The customer name that needs to be deleted",
              required: true,
              type: "string"
            }
          ],
          responses: {
            200: {
              description: 'Success',
              content: {
                  'application/json': {
                      schema: {
                          $ref: '#/components/schemas/Customers'
                      }
                  }
              }
          },
          401: {
              description: 'Unauthorized',
          },
          500: {
              description: 'Internal server error',
          },
          security: [
          {
              binglestore_auth: [
                  "write:customers",
                  "read:customers" 
              ]
          }
      ]
          }
        }
      },
    }
