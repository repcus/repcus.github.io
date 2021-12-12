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