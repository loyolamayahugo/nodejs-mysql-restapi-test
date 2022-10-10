import { Router } from 'express'
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee, updateEmployeePatch } from '../controllers/employees.controllers.js'

const router = Router()

router.get('/employees', getEmployees)

router.get('/employees/:id', getEmployee)

router.post('/employees', createEmployee)

router.put('/employees/:id', updateEmployee)

router.patch('/employees/:id', updateEmployeePatch)

router.delete('/employees/:id', deleteEmployee)

export default router