import ArkTypeForm from '@/app/_components/ArkTypeForm'
import ValibotForm from '@/app/_components/ValibotForm'
import ZodForm from '@/app/_components/ZodForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
	return (
		<main className="container grid grid-rows-3 grid-cols-1 w-fit h-screen">
			<div className="row-start-2 flex flex-col justify-center ">
				<Tabs defaultValue="Zod" className="w-[400px]">
					<TabsList className="grid grid-cols-3 w-full">
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
