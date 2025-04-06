'use client'

import { arktypeResolver } from '@hookform/resolvers/arktype'
import { type } from 'arktype'
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const schema = type({
	username: 'string > 0',
	age: '0 <= number < 200',
	'email?': 'string.email&/.*@example.com$/|undefined',
})
type Schema = typeof schema.infer

export default function ArkTypeForm() {
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<Schema>({
		resolver: arktypeResolver(schema),
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
		console.error(error)
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
			{errors.email ? (
				<p role="alert" className="text-sm text-muted-foreground text-red-600">
					{errors.email.message}
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
