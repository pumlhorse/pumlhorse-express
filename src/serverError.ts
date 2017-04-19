export function serverError(response, err) {
    console.log(err)
    response.status(500).send(err.stack.toString());
}