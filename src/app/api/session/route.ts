import { NextResponse } from "next/server";
import { getSessionBuilder } from "@/lib/auth";

export async function GET() {
  const builder = await getSessionBuilder();
  if (!builder) {
    return NextResponse.json(null, { status: 204 });
  }

  return NextResponse.json({
    name: builder.name,
    role: builder.role,
    workspaceHref: builder.workspaceHref,
  });
}
