module.exports = {
    '/seller/register': {
      post: {
        tags: [ 'seller' ],
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': {
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
                    format: 'password'
                  },
                },
                required: [
                  'name',
                  'email',
                  'password'
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
                  message: 'Register success',
                }
              }
            }
          }
        }
      }
    },
    '/seller/login': {
      post: {
        tags: ['seller'],
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    default: 'example@mail.com'
                  },
                  password: {
                    type: 'string',
                    default: 'examplepassword',
                    format: 'password'
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
                  status: 200,
                  message: 'Login Success',
                  token: 'weyfyewvf-wefwjef-wefwef',
                }
              }
            }
          },
          404: {
            content: {
              'application/json': {
                example: {
                  status: 404,
                  message: 'User not found',
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
    }
  }