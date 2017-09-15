const post = (body) => ({
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
});

module.exports = post;
