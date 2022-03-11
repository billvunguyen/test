module.exports = mongoose => {
    const Test = mongoose.model(
        "test",
        mongoose.Schema(
            {
                name: String,
                type: String,
                price: Number,
                rating: Number,
                warranty_years: Number,
                available: Boolean
            },
            { timestamps: true }
        )
    );
    return Test;
};