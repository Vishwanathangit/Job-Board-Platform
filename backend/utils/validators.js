const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  role: z.enum(['candidate', 'employer', 'admin'], {
    errorMap: () => ({ message: 'Please select a valid role' })
  }),
});

const jobSchema = z.object({
  title: z.string().min(3, 'Job title must be at least 3 characters'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  location: z.string().min(2, 'Location is required'),
  salary: z.number().min(0, 'Salary must be a positive number'),
  jobType: z.enum(['full-time', 'part-time', 'remote'], {
    errorMap: () => ({ message: 'Please select a valid job type' })
  }),
  requirements: z.string().min(20, 'Requirements must be at least 20 characters'),
});

const applicationSchema = z.object({
  job: z.string().uuid('Invalid job ID'),
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters'),
});

module.exports = {
  loginSchema,
  registerSchema,
  jobSchema,
  applicationSchema
};