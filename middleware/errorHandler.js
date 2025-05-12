export default function errorHandler(error, res) {
    console.log(error)

    const { name, status, field, message, code } = error

    return res.status(status).json({ [field]: message })
}