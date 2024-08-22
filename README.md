# laughing-octo-computing-machine

## Requirements
- Docker Compose (Tested on version v2.15.1)
- Bruno API Client (Optional) [Download](https://www.usebruno.com/downloads)

## Instalation
1. Clone repositoy
1. Run `docker compose up`

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
