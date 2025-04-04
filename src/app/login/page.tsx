'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { env } from '#env.ts';

const LoginSchema = z.object({
  password: z.string().min(3),
  username: z.string().min(3),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/login`,
        {
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        },
      );

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Login failed');
        return;
      }

      const { role, token } = await res.json();

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'ADMIN') router.push('/admin/tasks');
      else router.push('/tasks');
    } catch (err) {
      alert('Something went wrong with login');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-96 p-4">
        <CardContent>
          <Typography className="mb-4 text-center" variant="h5">
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              className="mb-4"
              fullWidth
              label="Username"
              variant="outlined"
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              className="mb-4"
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button fullWidth type="submit" variant="contained">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
