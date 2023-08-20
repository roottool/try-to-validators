import ArkTypeForm from '@/app/_components/ArkTypeForm'
import ValibotForm from '@/app/_components/ValibotForm'
import ZodForm from '@/app/_components/ZodForm'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
	return (
		<main className="container grid grid-rows-3 grid-cols-1 w-fit min-h-screen">
			<div className="row-start-2">
				<Tabs defaultValue="Zod" className="w-[400px]">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="Zod">Zod</TabsTrigger>
						<TabsTrigger value="ArkType">ArkType</TabsTrigger>
						<TabsTrigger value="Valibot">Valibot</TabsTrigger>
					</TabsList>
					<TabsContent value="Zod">
						<Card>
							<CardHeader>
								<CardTitle>Zod</CardTitle>
							</CardHeader>
							<CardContent>
								<ZodForm />
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="ArkType">
						<Card>
							<CardHeader>
								<CardTitle>ArkType</CardTitle>
							</CardHeader>
							<CardContent>
								<ArkTypeForm />
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="Valibot">
						<Card>
							<CardHeader>
								<CardTitle>Valibot</CardTitle>
							</CardHeader>
							<CardContent>
								<ValibotForm />
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</main>
	)
}
