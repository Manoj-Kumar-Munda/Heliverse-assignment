import app from "./app.js";
import connectDB from "./db/index.js";

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port 8000`)
    })

})
.catch( err => {
    console.error('Mongo db connection failed!!! ', err)
})

