import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";
import { getBuilderByHandle } from "@/lib/mock-db";
import { supabase } from "@/lib/supabase";
import type { Builder } from "@/lib/data-model";

export type SessionBuilder = Builder & {
  name: string;
  role: string;
  workspaceHref: string;
};

export async function getSessionBuilder(): Promise<SessionBuilder | null> {
  try {
    const session = await getServerSession(authOptions);
    const handle = (session?.user as any)?.handle;
    if (!handle) {
      return null;
    }

    let builder = getBuilderByHandle(handle as string);
    
    // If not in mock-db, try Supabase
    if (!builder && supabase) {
      const { data } = await supabase
        .from("builders")
        .select("*")
        .eq("handle", handle)
        .single();
      if (data) {
        builder = data;
      }
    }

    if (!builder) {
      return null;
    }

    return {
      ...builder,
      name: builder.display_name,
      role: "클럽 멤버",
      workspaceHref: `/builders/${builder.handle}`,
    };
  } catch {
    return null;
  }
}
