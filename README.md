# laughing-octo-computing-machine

## Requirements
- Docker Compose (Tested on version v2.15.1)
- Bruno API Client (Optional) [Download](https://www.usebruno.com/downloads)

## Instalation
1. Clone repositoy
1. Run `docker compose up`. This will build the image and start the container. You can start using the API when you see the message `Server running at http://localhost:3000`
1. The API will be available at `http://localhost:3000`

## How to test the API

The project contains a folder named `.bruno`. You could use Bruno client to easily test each one of the endpoint

If you want to test it with other API client here is a sort description of each endpoint
|HTTP Method| Path| Description
|---|---|---|
|POST| `/devices`| Create device|
|GET| `/devices`| List all devices|
|GET| `/devices/{id}`| Get device by id|
|PUT| `/devices/{id}`| Full update device by id|
|PATCH| `/devices/{id}`| Partial update device by id|
|DELETE| `/devices/{id}`| Delete device by id|
|POST| `/devices/search`| Search devices by brand|

A full description and example of each endpoint can be found in the OpenApi file [API Documentation](./device-service-api-definition.yml)
