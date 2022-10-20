module.exports = {
    //make schema for orders
    Orders: {
        type: 'object',
        required: [
            'id',
            'customer_id',
            'item_id',
            'qty',
            'status',
            'payment_method'
        ],
        properties: {
            id: {
                type: 'uuid',
                description: 'Unique order id',
                example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f'
            },
            customer_id: {
                type: 'uuid',
                format: 'uuid',
                description: 'Customer id',
                example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f'
            },
            item_id: {
                type: 'uuid',
                format: 'uuid',
                description: 'Item id',
                example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f'
            },
            qty: {
                type: 'integer',
                format: 'int64',
                minimum: 1
            },
            amount: {
                type: 'integer',
                format: 'int64',
                minimum: 1000

            },
            status: {
                type: 'string',
                enum: ['pending', 'processing', 'completed', 'cancelled']
            },
            payment_method: {
                type: 'string',
                enum: ['cash', 'credit card', 'debit card', 'paypal']
            },
            createdAt: {
                type: 'string',
                format: 'date-time'
            },
            updatedAt: {
                type: 'string',
                format: 'date-time'
            }
        }
    }
}