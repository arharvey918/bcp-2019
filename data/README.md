# Data schema

`readings.json` contains an array of Readings:

```json
{
    "month": "<month number>",
    "day": "<day number>",
    "morning": {
        "psalm": [
            {
                "book": "<name> (e.g., Psalm)",
                "chapter": "<chapter> (e.g., 1)",
                "verses": "<verse range> (e.g., 1-31)",
                "is_entire_chapter": true | false,
            }
        ],
        "first-lesson": [
            {
                "book": "<name> (e.g., Gen)",
                "chapter": "<chapter> (e.g., 1)",
                "verses": "<verse range> (e.g., 1-31)",
                "is_entire_chapter": true | false,
                "is_deuterocanonical": true | false
            }
        ],
        "second-lesson": [
            {
                "book": "<name> (e.g., Matt)",
                "chapter": "<chapter> (e.g., 1)",
                "verses": "<verse range> (e.g., 1-3)",
                "is_entire_chapter": true | false,
                "is_deuterocanonical": true | false
            }
        ]
    },
    "evening": {
        "psalm": [
            {
                "book": "<name> (e.g., Psalm)",
                "chapter": "<chapter> (e.g., 1)",
                "verses": "<verse range> (e.g., 1-31)",
                "is_entire_chapter": true | false,
            }
        ],
        "first-lesson": [
            {
                "book": "<name> (e.g., Gen)",
                "chapter": "<chapter> (e.g., 1)",
                "verses": "<verse range> (e.g., 1-31)",
                "is_entire_chapter": true | false,
                "is_deuterocanonical": true | false
            }
        ],
        "second-lesson": [
            {
                "book": "<name> (e.g., Matt)",
                "chapter": "<chapter> (e.g., 1)",
                "verses": "<verse range> (e.g., 1-3)",
                "is_entire_chapter": true | false,
                "is_deuterocanonical": true | false
            }
        ]
    }
}
```
