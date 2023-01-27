// see the documentation
// used to specify domain which can hit the backend
const whiteList = ["https://yoursite.thatCanHitBackend.com", "http://localhost:3001"];

const corsOption = {
    origin : (origin, callback) => {

        // FIXME: Uncomment me to see origin name
        // console.log(origin);

        if(whiteList.indexOf(origin) !== -1 || !origin)
            callback(null, true);
        else 
            callback(new Error("Not allowed by CORS"));
    },
    optionsSuccessStatus: 200
}

module.exports = corsOption;