import { useState } from "react"
import { Navigate, useLocation } from "react-router"
import FutureBuilder from "../components/FutureBuilder"
import { Credentials, useLoadCredentials } from "../data/credentials"
import loadForecasts from "../data/forecast_loader"
import DayForecast from "./component/day-forecast"
import "./index.scss"

function Timetable({
	sunrise: sunriseDate,
	sunset: sunsetDate,
}: {
	sunrise: Date
	sunset: Date
}) {
	const localeOptions: Intl.DateTimeFormatOptions = {
		hour: "numeric",
		minute: "numeric",
	}
	const now = new Date(Date.now()).toLocaleTimeString("en-US", localeOptions)
	const sunrise = sunriseDate.toLocaleTimeString("en-US", localeOptions)
	const sunset = sunsetDate.toLocaleTimeString("en-US", localeOptions)
	return (
		<table className="time-table">
			<tbody>
				<tr>
					<th>Time</th>
					<td>{now}</td>
				</tr>
				<tr>
					<th>Sunrise</th>
					<td>{sunrise}</td>
				</tr>
				<tr>
					<th>Sunset</th>
					<td>{sunset}</td>
				</tr>
			</tbody>
		</table>
	)
}

export default function Forecast() {
	const credentials: Credentials | null =
		useLoadCredentials()
	if (!credentials) {
		console.log("bad credentials")
		return <Navigate to="/login" />
	}
	return (
		<article>
			<header className="menu">
				<img src="/public/logo.png" alt="logo" width={20} height={20} />
				<h2 className="company-name">MetaWeather</h2>
				<sub>beta</sub>
				<nav className="menu-nav">
					<a href="">Home</a>
					<a href="">Language</a>
					<a href="">Map</a>
					<a href="">API</a>
					<a href="">About</a>
				</nav>
				<form className="search-form">
					<label htmlFor="text">Search</label>
					<input type="text" name="text" id="text" />
				</form>
			</header>
			<div className="forecast-body">
				<FutureBuilder future={loadForecasts}>
					{(e, isLoaded, isError) => {
						console.log("isError", isError)
						if (!isLoaded) return <div className="loading-screen">Loading</div>
						else
							return (
								<div>
									<section>
										<div className="info">
											<h1>Kyiv</h1>
											<Timetable
												sunrise={e!.sunrise}
												sunset={e!.sunset}
											></Timetable>
										</div>
										<div className="weather-panel">
											{e?.days.map((day) => (
												<DayForecast
													key={day.date.getTime()}
													day={day}
												></DayForecast>
											))}
										</div>
									</section>
								</div>
							)
					}}
				</FutureBuilder>
			</div>
		</article>
	)
}
