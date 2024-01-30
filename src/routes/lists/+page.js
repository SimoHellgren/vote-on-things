import { redirect } from "@sveltejs/kit";

export async function load({ parent }) {
    const { session, supabase } = await parent();

    // Probably good to redirect to auth if no session.
    // However, currently testing without redirect.
    // if (!session) {
    //     throw redirect(303, '/auth')
    // }

    const { data } = await supabase.from("list").select();

    return {
        user: session.user,
        list: data ?? [],
    };
}
