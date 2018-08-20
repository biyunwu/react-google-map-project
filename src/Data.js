export const getData = () => [
    {
        "id": "4d9db7087f9e4eb9436ea1fc",
        "name": "The Dutch",
        "location": {
            "lat": 40.72651075083395,
            "lng": -74.00214135646819,
            "formattedAddress": [
                "131 Sullivan St (at Prince St)",
                "New York, NY 10012"
            ]
        }
    },
    {
        "id": "4db3374590a0843f295fb69b",
        "name": "Spicy Village",
        "location": {
            "lat": 40.717182473933846,
            "lng": -73.99391023674033,
            "formattedAddress": [
                "68B Forsyth St (btwn Grand & Hester)",
                "New York, NY 10002"
            ]
        }
    },
    {
        "id": "5440ac89498e6faac0aa08a1",
        "name": "Upland",
        "location": {
            "lat": 40.74178650916105,
            "lng": -73.98477002978325,
            "formattedAddress": [
                "345 Park Ave S (at E 26th St)",
                "New York, NY 10010"
            ]
        }
    },
    {
        "id": "547d03e3498eb32c879589da",
        "name": "Baekjeong",
        "location": {
            "lat": 40.74709879834891,
            "lng": -73.98519423416221,
            "formattedAddress": [
                "1 E 32nd St (at 5th Ave)",
                "New York, NY 10016"
            ]
        }
    },
    {
        "id": "53f0c6bc498e01d5d2106388",
        "name": "Egg Shop",
        "location": {
            "lat": 40.72043055915065,
            "lng": -73.99497719620648,
            "formattedAddress": [
                "151 Elizabeth St (btwn Broome & Kenmare St)",
                "New York, NY 10012"
            ]
        }
    },
    {
        "id": "53a76f8b498e34ef9a638548",
        "name": "Flaming Kitchen",
        "location": {
            "lat": 40.717380518593096,
            "lng": -73.99537115802207,
            "formattedAddress": [
                "97 Bowery (at Hester)",
                "New York, NY 10002"
            ]
        }
    },
    {
        "id": "49c42857f964a5209f561fe3",
        "name": "Lobster Place",
        "location": {
            "lat": 40.7424407679208,
            "lng": -74.00612169096566,
            "formattedAddress": [
                "75 9th Ave (btwn W 15th & W 16th St)",
                "New York, NY 10011"
            ]
        }
    },
    {
        "id": "49c43598f964a520ad561fe3",
        "name": "ilili",
        "location": {
            "lat": 40.74433537661916,
            "lng": -73.98753967578142,
            "formattedAddress": [
                "236 5th Ave (btwn E 27th & E 28th St)",
                "New York, NY 10001"
            ]
        }
    },
    {
        "id": "49fe4b0df964a5208c6f1fe3",
        "name": "Ramen Takumi",
        "location": {
            "lat": 40.73069054542069,
            "lng": -73.99549625398208,
            "formattedAddress": [
                "1 University Pl (at Waverly Pl)",
                "New York, NY 10003"
            ]
        }
    },
    {
        "id": "3fd66200f964a520cee91ee3",
        "name": "La Lanterna di Vittorio",
        "location": {
            "lat": 40.73064081178975,
            "lng": -74.00013663852398,
            "formattedAddress": [
                "129 Macdougal St (btwn 3rd & 4th St)",
                "New York, NY 10012"
            ]
        }
    }
].sort((a, b) =>  b.location.lat - a.location.lat)