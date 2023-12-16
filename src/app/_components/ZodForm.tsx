'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const schema = z.object({
	username: z.string().min(1, { message: 'Please enter your username.' }),
	age: z
		.number({
			required_error: 'Please enter your age.',
			invalid_type_error: 'Please enter your age.',
		})
		.gte(0)
		.lt(200),
	email: z.optional(
		z
			.string()
			.email()
			.regex(/.*@example.com$/),
	),
})
type Schema = z.infer<typeof schema>

export default function ZodForm() {
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues: {
			username: '',
			age: NaN,
			email: '',
		},
	})

	const { toast } = useToast()
	const handleValidSubmit: SubmitHandler<Schema> = () => {
		toast({ variant: 'default', description: 'The form value is valid.' })
	}
	const handleInvalidSubmit: SubmitErrorHandler<Schema> = (error) => {
		console.log(error)
		toast({ variant: 'destructive', description: 'The form value is invalid.' })
	}

	return (
		<form onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}>
			<Label htmlFor="username">Username (Required)</Label>
			<Input placeholder="Username" {...register('username')} />
			{errors.username && (
				<p role="alert" className="text-sm text-muted-foreground text-red-600">
					{errors.username.message}
				</p>
			)}
			<Label htmlFor="age">Age (Required)</Label>
			<Input
				type="number"
				placeholder="Age"
				{...register('age', { valueAsNumber: true })}
			/>
			{errors.age && (
				<p role="alert" className="text-sm text-muted-foreground text-red-600">
					{errors.age.message}
				</p>
			)}
			<Label id="email-label" htmlFor="email">
				Email (Optional)
			</Label>
			<Input
				id="email"
				type="email"
				placeholder="sample@example.com"
				aria-labelledby="email-label"
				aria-describedby="email-description"
				{...register('email', {
					setValueAs: (value) => (!!value ? value : undefined),
				})}
			/>
			{errors.email && errors.email.type === 'invalid_string' ? (
				<p role="alert" className="text-sm text-muted-foreground text-red-600">
					Only &quot;example.com&quot; domains can be used.
				</p>
			) : (
				<p id="email-description" className="text-sm text-muted-foreground">
					Only &quot;example.com&quot; domains can be used.
				</p>
			)}
			<Button type="submit" className="mt-2">
				Submit
			</Button>
		</form>
	)
}
