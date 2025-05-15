import { useState } from "react"
import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "../contexts/auth-context"

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values) {
        setIsLoading(true)
        console.log(values)
        login(values).then((result) => {
            setIsLoading(false)
        })
        
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">Sign in to your account</CardTitle>
                <CardDescription>Enter your email and password to sign in</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
                        Forgot your password?
                    </Link>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col">
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-primary hover:underline">
                        Sign up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
