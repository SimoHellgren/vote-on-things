export async function load({ params, locals: { supabase, getSession } }) {
    const session = await getSession();
    const user = session.user;

    const { data: items } = await supabase.from("item").select().eq('list_id', params.id);
    const { data: list } = await supabase.from("list").select().eq('id', params.id).single();
    const { data: votes } = await supabase.from("itemvote").select(`
        id,
        item(id, name),
        user:profiles(id, email),
        result
    `).eq('list_id', params.id);

    return {
        list,
        user,
        items: items ?? [],
        votes: votes ?? [],
    };
}


export const actions = {
    castVote: async ({ params, request, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const result = formData.get("result");
        const item_id = formData.get("id");

        const session = await getSession();

        const { data, error } = await supabase.from("itemvote").insert(
            {
                item_id,
                user_id: session.user.id,
                result: result,
                list_id: params.id
            }
        ).select().single();

        if (error) console.error(error);

        return data

    },

    removeVote: async ({ params, request, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const voteId = formData.get("voteId");

        const { error } = await supabase.from("itemvote").delete().eq('id', voteId);

        if (error) console.error(error);

    },

    removeAllOwnVotes: async ({ params, locals: { supabase, getSession } }) => {
        const session = await getSession();
        const userId = session.user.id;

        const listId = params.id;

        const { error } = await supabase.from("itemvote").delete().eq('user_id', userId).eq('list_id', listId);

        if (error) console.error(error);
    }
}