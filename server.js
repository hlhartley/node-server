const http = require('http')
const port = 3000
const server = http.createServer()

const messages = [
    { 'id': 1, 'user': 'brittany storoz', 'message': 'hi there!' },
    { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
    { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
];

server.listen(port, () => {
    console.log(`The HTTP server is running on port ${port}.`)
})

server.on('request', (request, response) => {
if (request.method === 'GET') {
    getAllMessages(response)
}

else if (request.method === 'POST') {
    let newMessage 

    request.on('data', (data) => {
    newMessage = {
        id: new Date(),
        ...JSON.parse(data)
    }
    })

    request.on('end', () => {
    addMessage(newMessage, response);
    })
}
})

function getAllMessages(response) {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/plain')
    response.write(JSON.stringify(messages))
    response.end()
}

function addMessage(newMessage, response) {
    response.statusCode = 201
    response.setHeader('Content-Type', 'text/plain')
    response.write(JSON.stringify([...messages, newMessage]))
    response.end()
}



