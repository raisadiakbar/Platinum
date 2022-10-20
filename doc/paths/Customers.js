module.exports = {
  '/api/customer/register': {
    post: {
      tags: [ 'customer' ],
      summary: 'Register new customer',
      description: 'Register new customer',
      operationId: 'register',
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                  format: 'password',
                },
                photo: {
                  type: 'string',
                  format: 'binary',
                }
              },
              required: [
                'name',
                'email',
                'password',
                'photo'
              ]
            }
          }
        }
      },
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                status: 201,
                message: 'Register successfully',
              }
            }
          }
        },
        400: {
          content: {
            'application/json': {
              example: {
                status: 400,
                message: 'Email is already exist',
              }
            }
          }
        },
        500: {
          content: {
            'application/json': {
              example: {
                status: 500,
                message: 'Internal server error',
              }
            }
          }
        }
      }
    }
  },
  '/api/customer/login': {
    post: {
      tags: ['customer'],
      summary: 'Login as customer',
      description: 'Login as customer',
      operationId: 'login',
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string'
                },
                password: {
                  type: 'string',
                  format: 'password',
                },
              },
              required: [
                'email',
                'password'
              ]
            }
          }
        },
      },
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                status: 201,
                message: 'Login successfully',
              }
            }
          }
        },
        400: {
          content: {
            'application/json': {
              example: {
                status: 401,
                message: 'password is incorrect, please try again',
              }
            }
          }
        },
        500: {
          content: {
            'application/json': {
              example: {
                status: 500,
                message: 'Internal server error',
              }
            }
          }
        }
      }
    }
  },
  "/api/customer/customers": {
    get: {
      tags: ["customer"],
      summary: "Find all customer",
      description: "This can only be done by the logged in customer.",
      operationId: "getAll",
      responses: {
        '200': {
            description: 'Get all admins',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Admins',
                    },
                }
            }
        },
        '400': {
            description: 'Bad request',
            content: {
                'application/json': {
                    example: {
                        status: '400',
                        message: 'Bad request 400 - Invalid request body',
                    }
                }
            }
        },
        '500': {
            description: 'Internal server error',
            content: {
                'application/json': {
                    example: {
                        status: '500',
                        message: 'Internal server error',
                    }
                }
            }
        }
    },
    security: [
        {
            'token': [
                
            ],
        }
    ]
     
    }
  },

}
