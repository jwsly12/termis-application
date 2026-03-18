import openmeteo_requests

import pandas as pd
import requests_cache
from retry_requests import retry

# Setup the Open-Meteo API client with cache and retry on error
cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
openmeteo = openmeteo_requests.Client(session = retry_session)

# Make sure all required weather variables are listed here
# The order of variables in hourly or daily is important to assign them correctly below
url = "https://api.open-meteo.com/v1/forecast"
latitude = -5.08917
longitude = -42.80194

params = {
	"latitude": latitude,
	"longitude": longitude,
	"hourly": "temperature_2m",
	"current": ["rain", "is_day", "relative_humidity_2m", "apparent_temperature"],
	"timezone": "America/Sao_Paulo",
	"forecast_days": 1,
}
responses = openmeteo.weather_api(url, params=params)

# Process first location. Add a for-loop for multiple locations or weather models
response = responses[0]
print(f"Coordinates: {response.Latitude()}°N {response.Longitude()}°E")
print(f"Elevation: {response.Elevation()} m asl")
print(f"Timezone: {response.Timezone()}{response.TimezoneAbbreviation()}")
print(f"Timezone difference to GMT+0: {response.UtcOffsetSeconds()}s")

# Process current data. The order of variables needs to be the same as requested.
current = response.Current()
current_rain = current.Variables(0).Value()
current_is_day = current.Variables(1).Value()
current_relative_humidity_2m = current.Variables(2).Value()
current_apparent_temperature = current.Variables(3).Value()

print(f"\nCurrent time: {current.Time()}")
print(f"Current rain: {current_rain}")
print(f"Current is_day: {current_is_day}")
print(f"Current relative_humidity_2m: {current_relative_humidity_2m}")
print(f"Current apparent_temperature: {current_apparent_temperature}")

# Process hourly data. The order of variables needs to be the same as requested.
hourly = response.Hourly()
hourly_temperature_2m = hourly.Variables(0).ValuesAsNumpy()

hourly_data = {"date": pd.date_range(
	start = pd.to_datetime(hourly.Time() + response.UtcOffsetSeconds(), unit = "s", utc = True),
	end =  pd.to_datetime(hourly.TimeEnd() + response.UtcOffsetSeconds(), unit = "s", utc = True),
	freq = pd.Timedelta(seconds = hourly.Interval()),
	inclusive = "left"
)}

hourly_data["temperature_2m"] = hourly_temperature_2m

hourly_dataframe = pd.DataFrame(data = hourly_data)
print("\nHourly data\n", hourly_dataframe)
