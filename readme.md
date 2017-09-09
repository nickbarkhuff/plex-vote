# Plex Vote
A web app for voting on Plex media.

## Configuration
After cloning the repository, copy the example config file as "config.js":

`cp config.example.js config.js`

The settings available are as follows:

```
{
    port: the port to run this app on
    plex: {
        host: plex server hostname,
        port: plex server port,
        token: plex server token
    }
}
```
