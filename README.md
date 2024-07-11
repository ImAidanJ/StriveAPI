# Quote API

This project is a simple Quote API that serves random or specific quotes from various categories. 

## Features

- **Random Quote Retrieval:** Retrieve a random quote from a specified category.
- **Specific Quote Retrieval:** Retrieve a specific quote by its ID from a specified category.

## Current Status

This project is in its very early stages and has not been actively worked on for a while. Future updates and improvements may be planned.

## Overview of Functionality

- **Express Server:** The API is built using Express.js.
- **Dynamic Quote Loading:** Quotes are dynamically loaded from files based on the requested category.
- **Error Handling:** Basic error handling is implemented to manage missing files and invalid IDs.
- **Environment Variables:** Configuration is managed through environment variables.

## Project Structure

- **Server Setup:** The server is initialized and configured to use JSON middleware.
- **Quote Loading:** Quotes are loaded from files located in the `quotes` directory.
- **Endpoints:**
  - `GET /quotes/:category`: Fetch a random quote from the specified category.
  - `GET /quotes/:category/:id`: Fetch a specific quote by its ID from the specified category.

## Note

This API is still in development, and many features are subject to change. Contributions and suggestions are welcome!
