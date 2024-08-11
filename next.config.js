const supabaseImageUrl = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BASE_URL;

module.exports = {
    images: {
        domains: [supabaseImageUrl],
    },
};
