# Data schema

The JSON files in this directory contain reading plans that follow this schema:

```json
{
    "id": "some-id",
    "name": "A display name",
    "description": "A more descriptive name",
    "readings": [
        "id": "01-01",
        "month": 1,
        "day": 1,
        "passage": "<some passage reference>"
    ]
}
```

Additionally, `plans.json` contains relative links to the available reading plans.