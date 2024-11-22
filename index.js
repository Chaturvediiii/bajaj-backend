const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

app.post("/bfhl", (req, res) => {
    const { data, file_b64 } = req.body;

    // Example logic
    const numbers = data.filter((x) => !isNaN(Number(x)));
    const alphabets = data.filter((x) => isNaN(Number(x)));
    const highestLowercaseAlphabet = alphabets
        .filter((x) => /[a-z]/.test(x))
        .sort()
        .slice(-1);
    const isPrimeFound = numbers.some((num) => isPrime(Number(num)));

    res.json({
        is_success: true,
        user_id: "Tanisha Chaturvedi",
        email: "chaturveditanisha17@gmail.com",
        roll_number: "0101EC211128",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        is_prime_found: isPrimeFound,
        file_valid: !!file_b64,
        file_mime_type: file_b64 ? "image/png" : null,
        file_size_kb: file_b64 ? Buffer.from(file_b64, "base64").length / 1024 : null,
    });
});

app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Start server locally for testing (not used in production deployment on Vercel)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
