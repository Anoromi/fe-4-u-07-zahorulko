export interface ForecastDay {
	max: number
	min: number
	realMax: number
	realMin: number
	date: Date
	windspeed: number
	windgust: number
	winddirection: number
}

interface ResponceData {
	time: string[]
	temperature_2m_max: number[]
	temperature_2m_min: number[]
	apparent_temperature_max: number[]
	apparent_temperature_min: number[]
	windspeed_10m_max: number[]
	windgusts_10m_max: number[]
	winddirection_10m_dominant: number[]
	sunrise: string[]
	sunset: string[]
}

interface ForecastData {
	days: ForecastDay[]
	sunrise: Date
	sunset: Date
}
const sleep = (milliseconds: number) =>
	new Promise((resolve) => setTimeout(resolve, milliseconds))

export default async function loadForecasts(): Promise<ForecastData> {
	const endDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
	const startString = new Date().toISOString().slice(0, 10)
	const endString = endDate.toISOString().slice(0, 10)
	console.log(
		endDate,
		`https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&timezone=Europe%2FBerlin&startDate=${new Date().toISOString()}&endDate=${endDate.toISOString()}`
	)
	console.log(startString, endString)
	const response: ResponceData = (
		await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&timezone=Europe%2FBerlin&start_date=${startString}&end_date=${endString}`,
			{
				method: "GET",
			}
		).then((v) => v.json())
	).daily

	await sleep(3000)
	let resultDays: ForecastDay[] = []
	console.log(response)

	for (let index = 0; index < response.time.length; index++) {
		const date = new Date(Date.parse(response.time[index]))
		const max = response.temperature_2m_max[index]
		const min = response.temperature_2m_min[index]
		const realMax = response.apparent_temperature_max[index]
		const realMin = response.apparent_temperature_min[index]
		const windspeed = response.windspeed_10m_max[index]
		const windgust = response.windgusts_10m_max[index]
		const winddirection = response.winddirection_10m_dominant[index]
		resultDays.push({
			max,
			min,
			realMax,
			realMin,
			date,
			windspeed,
			windgust,
			winddirection,
		})
	}
	console.log("input", response)
	console.log("value", resultDays)
	return {
		days: resultDays,
		sunrise: new Date(response.sunrise[0]),
		sunset: new Date(response.sunset[0]),
	}
}
