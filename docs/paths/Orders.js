module.exports = {

    '/api/order/addOrders': {
        post: {
            tags: ['order'],
            summary: 'Add new order',
            description: 'Add new order',
            operationId: 'addOrders',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'body',
                    description: 'Order object that needs to be added',
                    required: true,
                    schema: {
                        $ref: '#/components/schemas/Orders'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Orders'
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                }
            },
            security: [
                {
                    binglestore_auth: [
                        'write:orders',
                        'read:orders'
                    ]
                }
            ]
        }
    },

    '/api/order/orders': {
        get: {
            tags: ['order'],
            summary: 'Get all orders',
            description: 'Get all orders',
            operationId: 'getOrders',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [],
            responses: {
                200: {
                    description: 'Success',
                    schema: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Orders'
                        }
                    }
                },
                401: {
                    description: 'Unauthorized',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                }
            },
            security: [
                {
                    binglestore_auth: [
                        'write:orders',
                        'read:orders'
                    ]
                }
            ]
        }
    },

    '/api/order/orders/{id}': {
        get: {
            tags: ['order'],
            summary: 'Get order by id',
            description: 'Get order by id',
            operationId: 'getOrderById',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID of order that needs to be fetched',
                    required: true,
                    schema : {
                        type: 'integer',
                        format: 'int64'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Orders'
                            }
                        }
                    }
                },
                400: {
                    description: 'Invalid ID supplied',
                    content: {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            },
            security: [
                {
                    binglestore_auth: [
                        'write:orders',
                        'read:orders'
                    ]
                }
            ]  
        },

        put: {
            tags: ['order'],
            summary: 'Update order by id',
            description: 'Update order by id',
            operationId: 'updateOrder',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID of order that needs to be updated',
                    required: true,
                    schema : {
                        type: 'integer',
                        format: 'int64'
                    }
                }

            ],
            requestBody: {
                description: 'Order object that needs to be updated',
                required: true,
                content: {
                    '*/*': {
                        schema: {
                            $ref: '#/components/schemas/Orders'
                        }
                    }
                }
            },
            responses: {
                401: {
                    description: 'Unauthorized',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                }
            },
            security: [
                {
                    binglestore_auth: [
                        'write:orders',
                        'read:orders'
                    ]
                }
            ]
        },

        delete: {
            tags: ['order'],
            summary: 'Delete order by id',
            description: 'Delete order by id',
            operationId: 'deleteOrder',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Order id',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                }
            },
            security: [
                {
                    binglestore_auth: [
                        'write:orders',
                        'read:orders'
                    ]
                }
            ]
        }
    },

    
}
// Compare this snippet from docs\schemas\Customers.js:


            
