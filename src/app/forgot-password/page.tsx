'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { AuthLayout } from '@/components/auth-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, values.email);
      setIsSent(true);
      toast({
        title: 'Email enviado',
        description: 'Verifique sua caixa de entrada para redefinir sua senha.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível enviar o email de redefinição. Verifique o email informado.',
      });
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-sm border-none bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Recuperar Senha</CardTitle>
          <CardDescription>
            Digite seu email para receber um link de redefinição de senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSent ? (
            <div className="text-center">
              <p className="text-foreground">Email de redefinição enviado com sucesso!</p>
              <p className="text-sm text-muted-foreground">Verifique sua caixa de entrada e spam.</p>
              <Button asChild className="mt-4">
                <Link href="/login">Voltar para o Login</Link>
              </Button>
            </div>
          ) : (
            <>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="seu@email.com"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader /> : 'Enviar link'}
                  </Button>
                </form>
              </Form>
              <div className="mt-4 text-center text-sm">
                Lembrou sua senha?{' '}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Login
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
