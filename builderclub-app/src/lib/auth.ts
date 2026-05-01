import { auth } from "@/lib/auth-config";
import { getBuilderByHandle } from "@/lib/mock-db";
import type { Builder } from "@/lib/data-model";

export type SessionBuilder = Builder & {
  name: string;
  role: string;
  workspaceHref: string;
};

export async function getSessionBuilder(): Promise<SessionBuilder | null> {
  try {
    const session = await auth();
    if (!session?.user?.handle) {
      return null;
    }

    const builder = getBuilderByHandle(session.user.handle as string);
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
