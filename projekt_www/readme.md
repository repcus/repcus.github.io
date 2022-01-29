## JSON schema
Schema for recipe
```
{
    "ingredients": [
        {
            "name": $name,
            "weight": $weight
        },
        ...
        ...
        ...
    ],
    "steps": [
        { 
            "number": $number,
            "title": $title,
            "description": $description
        },
        ...
        ...
        ...
    ],
    "stepsForMachine": [
        {
            "number": $number, 
            "operation": $operation, 
            "additionalArguments": [ 
                {
                    "argumentType": $argumentType,
                    "argumentValue": $argumentValue
                },
                ...
                ...
                ...
            ]
        },
        ...
        ...
        ...
    ]
}

$name - string - name of ingredient
$weight - number 
$number - number - ordering number of step
$title - string - title of step
$description - string - description of step
$operation - string - name of operation known for machine
$argumentType - string - additional argument type for machine operation (time, temperature (with measure), power, etc.)
$argumentValue - number - additional argument value for machine operation (time in minutes, temperature (in C/K), power level, etc.)
```

## What else is required:
 - list of allowed operations with required arguments for certain operation

## Setup:
 - docker installation [windows](https://docs.docker.com/desktop/windows/install/) [ubuntu](https://docs.docker.com/engine/install/ubuntu/)
 - containers on linux are usually at `localhost`, on windows docker is creating vm to handle networking (and other stuff I guess), so you need to check and adjust ip to access conatiner in application, to check run `docker-machine ip`

## Docker
- in projekt_www directory run `docker-compose up -d` to build and run mongodb container
- next step is to run setup script `node init-mongo.js` (workaround for docker volumes not beeing friendly on windows)
- `docker-compose down` to tear down all docker compose containers with their current state (including db stored data)
- you can connect to db as root user using command `docker exec -it mongodb mongo -u root -p password`
- to connect as application user `docker exec -it mongodb mongo applicationDb -u user -p password`

## MongoDB shell
- JS synthax
- after connecting `show dbs`, `use <db_name>`, `show collections`, `use <collection_name>`
- [query data](https://docs.mongodb.com/manual/reference/method/db.collection.find/)
- or use Mongo Compass

## Express
- to run server open command prompt in  "projekt_www/express/bin/" by command: "node www"

## NodeJS
- install node-localstorage
- install install json-validation
