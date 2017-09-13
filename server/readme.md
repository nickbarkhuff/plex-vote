# API Routes

## /login

### POST

#### Description
Log in an existing user.

#### Request
* username
* password

#### Response

*On Success*
```
{
    success: true,
    jwt: "your web token"
}

```
*On Failure*
```
{
    success: false,
    error: "error message"
}
```

## /register

### POST

#### Description
Register a new user.

#### Request
* username
* password

#### Response

*On Success*
```
{
    success: true,
    jwt: "your web token"
}

```
*On Failure*
```
{
    success: false,
    error: "error message"
}
```

## /votes

### GET

#### Description
Get existing votes.

#### Response
```
{
    "media_unique_id": {
        score: "0.49015684672072346",
        votes: [
            {
                username: "foo",
                rating: 5
            },
            {
                username: "bar",
                rating: 3
            }
        ]
    }
}
```

### POST

#### Description
Submit a new vote.

#### Request
* jwt
* media
* rating

#### Response
Status Codes:
* 200: Success
* 401: Unauthorized
* 422: Incorrect request parameters
