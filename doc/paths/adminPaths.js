module.exports = {
    '/admin/login': {
      post: {
        tags: ['admin'],
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
                  }
                },
                required: [
                  'email',
                  'password',
                ]
              },
            }
          }
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
    },
    '/admin/register': {
      post: {
        tags: [ 'admin' ],
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
              },
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
    '/admin': {
      get: {
        tags: ['admin'],
        responses: {
          200: {
            content: {
              'application/json': {
                example: {
                  status: 200,
                  message: 'Berhasil mendapatkan list admin',
                  list: [
                    {
                      id: 'asfbdsjf-afdsf-sdfsdf',
                      name: 'Admin',
                      role: 1,
                      createdAt: '',
                      updatedAt: '',
                    }
                  ]
                }
              }
            }
          },
          401: {
            content: {
              'application/json': {
                example: {
                  status: 401,
                  message: 'Unauthorized'
                }
              }
            }
          }
        },
        security: [
          {
            token: []
          }
        ]
      }
    },
  }