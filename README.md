test endpoints 

http://localhost:5000/office/health-check       // general health-check
http://localhost:5000/office/testFail           // Test and fail the appRoute
http://localhost:5000/office/worklife           // Test and pass the appRoute


endpoint header:
verb:
    get
header: 
    content-type : application/json
    authorization: bearer <jwt token>

