module.exports = {
    '/items': {
      get: {
        tags: ['item'],
        responses: {
          200: {
            content: {
              'application/json': {
                example: {
                  status: 200,
                  message: 'Success get items',
                  items: [
                    {
                      id: 'dwfgwy-6326rfgsj-23rb',
                      name: 'Asus Pro 13',
                      price: 5_000_000
                    },
                    {
                      id: 'sdfsf-6326rfgsj-23rb',
                      name: 'Asus Pro 12',
                      price: 2_000_000
                    },
                  ]
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['item'],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string'
                  },
                  price: {
                    type: 'number'
                  },
                  files: {
                    type: 'array',
                    items: {
                      type: 'string',
                      format: 'binary'
                    }
                  }
                },
                required: [
                  'name',
                  'price',
                ]
              }
            }
          }
        },
        responses: {
          201: {
            content: {
              'application/json': {
                example: {
                  status: 201,
                  message: 'Item created',
                }
              }
            }
          },
          400: {
            content: {
              'application/json': {
                example: {
                  status: 400,
                  message: 'Token invalid',
                }
              }
            }
          },
          401: {
            content: {
              'application/json': {
                example: {
                  status: 401,
                  message: 'Unauthorized',
                }
              }
            }
          },
        },
        security: [
          {
            token: []
          }
        ],
      }
    },
    '/items/image': {
      delete: {
        tags: ['item'],
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': {
              schema: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string'
                  },
                  public_id: {
                    type: 'string'
                  }
                },
                required: [
                  'id',
                  'public_id',
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
                  status: 200,
                  message: 'Image deleted',
                }
              }
            }
          },
          400: {
            content: {
              'application/json': {
                example: {
                  status: 400,
                  message: 'Token invalid',
                }
              }
            }
          },
          401: {
            content: {
              'application/json': {
                example: {
                  status: 401,
                  message: 'Unauthorized',
                }
              }
            }
          },
        },
        security: [
          {
            token: []
          }
        ],
      }
    }
  }