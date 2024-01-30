import { supabase } from "$lib/supabaseClient";

export const actions = {
    default: async ({ request }) => {

        const formData = await request.formData()
        const listname = formData.get("listname")

        const { dbData, error } = await supabase.from("list").insert([
            {
                name: listname,
            },
        ]);

        if (error) {
            console.error(error);
            return {
                status: 500,
                body: error,
            };
        }

        return {
            status: 200,
            body: dbData,
        };
    }
}
