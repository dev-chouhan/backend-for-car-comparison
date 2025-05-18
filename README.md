# 🚗 Car Comparison Backend

A backend service for comparing up to 4 car models, browsing all available car models, and retrieving full specifications of a selected model — powered by the [CarQuery API](https://www.carqueryapi.com/).

---

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **Axios** for HTTP requests
- **Node-cache** for in-memory caching
- **CarQuery API** (free car specification data)

---

## 🧠 Project Goals

This backend enables:
- Comparing detailed specs of up to 4 cars
- Listing all available car models
- Viewing full specifications for a single car
- Speeding up performance with smart caching
- Acting as a proxy between the client and CarQuery API

---

## ⚙️ Backend Architecture

### 📌 Routes Implemented

| Endpoint                  | Description                                         |
|--------------------------|-----------------------------------------------------|
| `/api/carquery/makes`    | Fetch all car manufacturers                        |
| `/api/carquery/models`   | Fetch car models for a specific make and year      |
| `/api/carquery/trims`    | Fetch trims/specs for a specific model             |
| `/allcars`               | Returns a simplified specs list of all car models  |
| `/allcars/:carid`        | Returns full specs of a specific car ID            |
| `/compare?ids=...`       | Compare specs of up to 4 cars by IDs               |

---

## 🧱 Design & Approach

### ✅ Proxy Layer
We proxy all requests to CarQuery API:
- Hides complexity of original API
- Handles validation & transformation
- Makes it easier to cache responses

### ✅ Caching Layer
- Implemented using `node-cache`
- Caches `makes`, `models`, and `trims` queries
- Significantly reduces repeated API calls
- Improves performance and response time

### ✅ Flexible Filtering & Cleanup
- Car specs are filtered to include only valid entries
- Ensures comparison tables are clean and complete

---

## 🚀 How to Run & Test the API

### 1. Clone the Repo
git clone https://github.com/your-username/car-comparison-backend.git
cd car-comparison-backend

## Install Dependencies
- npm install

## Start the Server
- npm run dev
This runs on http://localhost:3000

# 🧪 Test the Endpoints
## You can test using Postman, Insomnia, or your browser:

###🔹 Get all makes
GET http://localhost:3000/api/carquery/makes

###🔹 Get models by make & year
GET http://localhost:3000/api/carquery/models?make=toyota&year=2020

###🔹 Get trims for a model
GET http://localhost:3000/api/carquery/trims?model=corolla

###🔹 Get all simplified cars
GET http://localhost:3000/allcars

###🔹 Get full specs of a car
GET http://localhost:3000/allcars/1234

###🔹 Compare 2–4 cars
GET http://localhost:3000/compare?ids=1234,5678,9012

# Project Structure
.
├── /routes
│   └── carquery.js        # Proxy logic & API routes
├── cache.js               # node-cache setup and acces
├── index.js               # Main entry point
└── README.md              # You're reading it!

# 🧹 Future Improvements
- Use Redis instead of node-cache for production
- Add pagination to /allcars
- Add error logging and retry strategies
- Protect endpoints with rate limiting
- Combine with frontend (React or others)
- Explore car pricing APIs (next phase)

# 👨‍💻 Author
Dev Chouhan






saved it to meamory that we have to do host backend to render first, second: in .env we will connect both frontend and backend base url so we don't have to chenge many places, the we will move on to frontend development from begining. Here first page will be compare cars and another page will be get all cars. In front page: there will be dropdown and allow to search through first letter only, like typing b or B will get dropdown to BMW, or any other car starts with B. There will be 4 dropdowns and on first it is compulsory to choose a car( car name and model both: it can be like: BMW | M3). other 3 will have none or other car names. If none is selected in last then we can fetch data for other cars and leave last one, so that we can compare only 3 cars. The car data will be displayed below in tabular formate as soon as we click compare. And on refresh each value will be refreshed again. and at last we will give view car details, which will open '/allcars/:thatcarid' in new page. Also another page "/allcars" will only have basic info about cars and view more button, which open seperate page just like '/allcars/:thatcarid' in new page. It will be 2 page application: first page-compare cars and second page-all cars, rest will be just '/allcars/:thatcarid' page which has same disign as all and differ in information about car. 
