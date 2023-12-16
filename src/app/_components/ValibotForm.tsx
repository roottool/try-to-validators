'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import {
	useForm,
	type SubmitErrorHandler,
	type SubmitHandler,
} from 'react-hook-form'
import type { Input as ValibotInput } from 'valibot'
import {
	email,
	endsWith,
	maxValue,
	minLength,
	minValue,
	number,
	object,
	optional,
	string,
} from 'valibot'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const schema = object({
	username: string('Your username must be a string.', [
		minLength(1, 'Please enter your username.'),
	]),
	age: number('Your age must be a number.', [minValue(0), maxValue(199)]),
	email: optional(string([email(), endsWith('@example.com')])),
})
type Schema = ValibotInput<typeof schema>

export default function ValibotForm() {
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<Schema>({
		resolver: valibotResolver(schema),
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
			{errors.email && errors.email.type === 'ends_with' ? (
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
