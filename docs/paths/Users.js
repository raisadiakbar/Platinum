module.exports = {
    "/api/user/register": {
        post: {
          tags: [
            "user"
          ],
          summary: "Create user",
          description: "This can only be done by logged in user.",
          operationId: "register",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              in: "body",
              name: "body",
              description: "Created user object",
              required: true,
              schema: {
                $ref: "#/components/schemas/Users"
              }
            }
          ],
          responses: {
            200: {
              description: 'Success',
              content: {
                  'application/json': {
                      schema: {
                          $ref: '#/components/schemas/Users'
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
                  "write:Users",
                  "read:Users" 
              ]
          }
      ]
          }
        }
      },
      "/api/user/login": {
        post: {
        tags: [
          "user"
        ],
        summary: "User Login",
        description: "This can only be done by logged in user.",
        operationId: "login",
        produces: [
          "application/json"
        ],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Created user object",
            required: true,
            schema: {
              $ref: "#/components/schemas/Users"
            }
          }
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Users'
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
                "write:Users",
                "read:Users" 
            ]
        }
    ]
        }
      }
    },
     
    "/api/user/findAlluser": {
        get: {
          tags: ["user"],
          summary: "Find all User",
          description: "This can only be done by the logged in User.",
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
                          $ref: '#/components/schemas/Users'
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
                  "write:Users",
                  "read:Users" 
              ]
          }
      ]
          }
        }
      },
        
      "/api/user/updatePassword": {
      put: {
        tags: ["user"],
        summary: "Updated Password",
        description: "This can only be done by the logged in user.",
        operationId: "updatePassword",
        produces: [
          "application/json"
        ],
        parameters: [
          {
            name: "Password",
            in: "path",
            description: "name that need to be updated",
            required: true,
            type: "string"
          },
          {
            in: "body",
            name: "body",
            description: "Updated user password",
            required: true,
            schema: {
              $ref: "#/components/schemas/Users"
            }
          }
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Users'
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
                "write:Users",
                "read:Users" 
            ]
        }
    ]
        }
      }
    },
  }
