import { useEffect, useMemo } from "react"
import { ForecastDay } from "../../data/forecast_loader"
import "./day-forecast.scss"

function sameDay(first: Date, second: Date) {
	return (
		first.getDate() == second.getDate() &&
		first.getMonth() == second.getMonth() &&
		first.getFullYear() == second.getFullYear()
	)
}

export default function DayForecast({ day }: { day: ForecastDay }) {
	const dateText = useMemo(() => {
		const now = new Date()
		if (sameDay(day.date, now)) {
			return "Today"
		} else if (
			sameDay(day.date, new Date(now.getTime() + 24 * 60 * 60 * 1000))
		) {
			return "Tomorrow"
		} else {
			console.log(day.date)
			return day.date.toLocaleDateString(undefined, {
				day: "2-digit",
				month: "long",
			})
		}
	}, [day])

	const directionStyle = {
		transform: `rotateZ(${day.winddirection}deg)`,
	}

	return (
		<div className="forecast-card">
			<h3>{dateText}</h3>
			<div>
				<em>Min:</em> {day.min} °C
			</div>
			<div>
				<em>Max:</em> {day.max} °C
			</div>
			<div>
				<em>Max feeling:</em> {day.realMax} °C
			</div>
			<div>
				<em>Min feeling:</em> {day.realMin} °C
			</div>
			<div>
				<em>Wind speed:</em> {day.windspeed} km/h
			</div>
			<div>
				<em>Wind gusts:</em> {day.windgust} km/h<sup>2</sup>
			</div>
			<div>
				<em>Wind direction:</em>{" "}
				<span
					className="material-symbols-outlined forecast-direction"
					style={directionStyle}
				>
					arrow_forward
				</span>
			</div>
		</div>
	)
}
