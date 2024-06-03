const express = require('express')
const userRouter = require('./routes/user.routes')
const patientRouter = require('./routes/patient.routes')
const regionRouter = require('./routes/region.routes')
const specializationRouter = require('./routes/specialization.routes')
const doctorRouter = require('./routes/doctor.routes')
const roleRouter = require('./routes/role.routes')
const visitRouter = require('./routes/visit.routes')
const personalDateRouter = require('./routes/personalDate.routes')

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.static('Frontend'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Frontend/index.html')
})

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', patientRouter)
app.use('/api', regionRouter)
app.use('/api', specializationRouter)
app.use('/api', doctorRouter)
app.use('/api', roleRouter)
app.use('/api', visitRouter)
app.use('/api', personalDateRouter)

app.listen(PORT, () => console.log(`server started on post ${PORT}`))