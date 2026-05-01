import { cookies } from "next/headers";
import { getBuilderByHandle } from "@/lib/mock-db";
import type { Builder } from "@/lib/data-model";

export type SessionBuilder = Builder & {
  name: string;
  role: string;
  workspaceHref: string;
};

export async function getSessionBuilder(): Promise<SessionBuilder | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("builderclub_session")?.value;
    if (!session) {
      return null;
    }

    const builder = getBuilderByHandle(session);
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
