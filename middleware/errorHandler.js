export default function errorHandler(err, res) {
    let { name, status, field, message } = err
    
    return res.status(status).json({ [field]: message})
}