import express from 'express'
import { router } from './infra/routes'
import { startPatientReminderCron } from './infra/cron/patientReminder.cron'

const PORT = process.env.PORT ?? 3001

export const app = express()

app.use(express.json())
app.use(router)

startPatientReminderCron()

app.listen(PORT, () => console.log(`Server client is running on PORT ${PORT}`))
