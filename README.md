# Country Information Application

The Country Information Application is designed to provide users with information about different countries. It allows users to select a country manually or automatically based on their current location. Once­ a country is chosen, the application provides in-de­pth details on currency exchange­ rates and available airports within that specific location.

### Table of Contents

- [Key Features](#Key-Features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)

### Key Features:

- **Automatic Country Selection:** Users can also choose to have the application automatically select their country based on their current location. To achieve this, the application requests the user's location access rights (latitude and longitude). Using the Google Geocoding API, the application determines the country based on the latitude and longitude.

- **Caching:** To improve performance and reduce redundant API requests, the application employs caching. Cached information is stored temporarily but is deleted after the page is refreshed. Caching includes currency exchange rates and airport information. For example, if a user selects a country, navigates to another page, and then returns to the previous country, the cached information is used instead of making new API requests.

- **Currency Exchange:** After selecting the country, users can access the "Currency Exchange" page. Here, they can choose a destination country and enter an amount to convert. The application then converts the entered amount into the currency of the selected destination country using a currency API.

- **Airports:** Users can access the "Airports" page to view a list of airports in the selected country. The page also includes a search field that sends API requests as users type. However, API requests are sent only if 500 milliseconds have passed since the last character was entered to avoid redundant requests.

### Tech Stack

- [ReactJS](https://react.dev/) - The library for web and native user interfaces
- [react-query](https://tanstack.com/query/v3/) - data-fetching library for React
- [Tailwind](https://tailwindcss.com/) - A utility-first CSS framework.
- [MUI](https://mui.com/) - It offers a comprehensive suite of free UI tools.

### screenshots

![App Screenshot](/public/application.jpg)
