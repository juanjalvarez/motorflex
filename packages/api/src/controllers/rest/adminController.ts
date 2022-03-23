import { Controller, ClassMiddleware } from '@overnightjs/core'
import { adminSecretRequiredMiddleware } from './middleware/adminSecretRequiredMiddleware'

@Controller('admin')
@ClassMiddleware(adminSecretRequiredMiddleware)
export class AdminController {}
