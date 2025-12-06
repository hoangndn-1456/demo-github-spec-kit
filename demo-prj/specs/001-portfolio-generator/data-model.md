# Data Model

## Profile Schema (JSON)

We will use a standard JSON structure compatible with common resume schemas where possible.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "basics": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "label": { "type": "string" },
        "email": { "type": "string", "format": "email" },
        "phone": { "type": "string" },
        "url": { "type": "string", "format": "uri" },
        "summary": { "type": "string" },
        "location": { "type": "string" },
        "profiles": {
          "type": "array",
          "items": {
             "type": "object",
             "properties": {
               "network": { "type": "string" },
               "username": { "type": "string" },
               "url": { "type": "string", "format": "uri" }
             }
          }
        }
      },
      "required": ["name"]
    },
    "work": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "position": { "type": "string" },
          "url": { "type": "string", "format": "uri" },
          "startDate": { "type": "string", "format": "date" },
          "endDate": { "type": "string", "format": "date" },
          "summary": { "type": "string" },
          "highlights": { "type": "array", "items": { "type": "string" } }
        }
      }
    },
    "projects": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "description": { "type": "string" },
          "highlights": { "type": "array", "items": { "type": "string" } },
          "url": { "type": "string", "format": "uri" }
        }
      }
    },
    "education": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
            "institution": { "type": "string" },
            "area": { "type": "string" },
            "studyType": { "type": "string" },
            "startDate": { "type": "string", "format": "date" },
            "endDate": { "type": "string", "format": "date" }
        }
      }
    },
    "skills": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "level": { "type": "string" },
          "keywords": { "type": "array", "items": { "type": "string" } }
        }
      }
    }
  }
}
```
