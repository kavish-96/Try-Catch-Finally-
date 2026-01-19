import os
import django
import random
from datetime import date

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from api.models import City, WeatherData, AirQuality, TrafficData, AgricultureData, HealthIndex

def seed():
    print("🌱 Seeding database...")

    cities_data = [
        {"name": "New Delhi", "state": "Delhi", "lat": 28.6139, "lon": 77.2090, "risk": "High"},
        {"name": "Mumbai", "state": "Maharashtra", "lat": 19.0760, "lon": 72.8777, "risk": "Medium"},
        {"name": "Bangalore", "state": "Karnataka", "lat": 12.9716, "lon": 77.5946, "risk": "Low"},
        {"name": "Chennai", "state": "Tamil Nadu", "lat": 13.0827, "lon": 80.2707, "risk": "Medium"},
        {"name": "Kolkata", "state": "West Bengal", "lat": 22.5726, "lon": 88.3639, "risk": "High"},
        {"name": "Hyderabad", "state": "Telangana", "lat": 17.3850, "lon": 78.4867, "risk": "Low"},
    ]

    today = date.today()

    for data in cities_data:
        city, created = City.objects.get_or_create(
            city_name=data["name"],
            defaults={
                "state": data["state"],
                "latitude": data["lat"],
                "longitude": data["lon"]
            }
        )
        if created:
            print(f"Created City: {city.city_name}")
        else:
            print(f"Found City: {city.city_name}")

        # Weather
        WeatherData.objects.update_or_create(
            city=city, date=today,
            defaults={
                "temperature": random.uniform(25, 40),
                "humidity": random.uniform(40, 80),
                "rainfall": random.uniform(0, 50)
            }
        )

        # Air Quality
        aqi_val = random.randint(50, 400)
        AirQuality.objects.update_or_create(
            city=city, date=today,
            defaults={
                "aqi": aqi_val,
                "pm25": aqi_val / 2,
                "pm10": aqi_val * 1.2,
                "no2": random.uniform(10, 100)
            }
        )

        # Traffic
        TrafficData.objects.update_or_create(
            city=city, date=today,
            defaults={
                "traffic_density": random.randint(1, 10),
                "avg_speed": random.uniform(20, 60)
            }
        )

        # Agriculture
        AgricultureData.objects.update_or_create(
            city=city, date=today, crop_type="Wheat",
            defaults={
                "yield_amount": random.uniform(2, 5),
                "soil_moisture": random.uniform(30, 60)
            }
        )

        # Health
        # Manually setting risk to match the requested 'risk' for consistent demo
        risk_score = 80 if data["risk"] == "High" else 50 if data["risk"] == "Medium" else 20
        HealthIndex.objects.update_or_create(
            city=city, date=today,
            defaults={
                "health_risk_score": risk_score,
                "risk_level": data["risk"]
            }
        )

    print("✅ Database successfully seeded!")

if __name__ == "__main__":
    seed()
