'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { env } from '#env.ts';

const TaskSchema = z.object({
  deletedAt: z.string().nullable().optional(),
  description: z.string().optional(),
  id: z.string(),
  reminderDate: z.string().optional(),
  status: z.string(),
  title: z.string(),
  userId: z.string(),
});

type TaskType = z.infer<typeof TaskSchema>;

const CreateTaskSchema = z.object({
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED', 'PENDING']),
  title: z.string().min(1),
});

type CreateTaskFormData = z.infer<typeof CreateTaskSchema>;

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Array<TaskType> | null>(null);
  const [loading, setLoading] = useState(false);

  // React Hook Form for creating a new task
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateTaskFormData>({
    defaultValues: {
      description: '',
      status: 'TODO',
      title: '',
    },
    resolver: zodResolver(CreateTaskSchema),
  });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      const res = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      const arr = z.array(TaskSchema).parse(data);
      setTasks(arr);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function onCreateTask(formData: CreateTaskFormData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/tasks`,
        {
          body: JSON.stringify(formData),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      );
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to create task');
        return;
      }
      reset(); // Clear form
      fetchTasks(); // Refresh tasks
    } catch (err) {
      console.error(err);
    }
  }

  if (loading && !tasks) return <div>Loading tasks...</div>;

  return (
    <div className="container mx-auto mt-8">
      <Typography className="mb-4" variant="h4">
        My Tasks
      </Typography>

      <Card className="mb-6">
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onCreateTask)}
          >
            <TextField
              label="Title"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label="Description"
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <Select
              defaultValue="TODO"
              {...register('status')}
              error={!!errors.status}
            >
              <MenuItem value="TODO">TODO</MenuItem>
              <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
              <MenuItem value="COMPLETED">COMPLETED</MenuItem>
              <MenuItem value="PENDING">PENDING</MenuItem>
            </Select>
            {errors.status && (
              <p className="text-red-500">{errors.status.message}</p>
            )}
            <Button type="submit" variant="contained">
              Add Task
            </Button>
          </form>
        </CardContent>
      </Card>

      {tasks &&
        tasks.map((task) => (
          <Card className="mb-4" key={task.id}>
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              {task.description && (
                <Typography color="text.secondary" variant="body2">
                  {task.description}
                </Typography>
              )}
              <Typography variant="body2">Status: {task.status}</Typography>
              {task.reminderDate && (
                <Typography variant="body2">
                  Reminder: {format(parseISO(task.reminderDate), 'PPP p')}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
