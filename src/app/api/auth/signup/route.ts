import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { addMockBuilder, getBuilderByEmail, getBuilderByHandle } from "@/lib/mock-db";
import type { Builder } from "@/lib/data-model";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "이메일과 비밀번호를 입력해주세요." }, { status: 400 });
    }

    const emailPrefix = email.split("@")[0];
    const displayName = emailPrefix;
    const handle = emailPrefix.toLowerCase(); // Predictable handle

    const passwordHash = await bcrypt.hash(password, 10);

    if (supabase) {
      // Check if email or handle already exists
      const { data: existingUser } = await supabase
        .from("builders")
        .select("id")
        .or(`email.eq.${email},handle.eq.${handle}`);
      
      if (existingUser && existingUser.length > 0) {
        return NextResponse.json({ error: "이미 존재하는 이메일이거나 핸들입니다." }, { status: 409 });
      }

      const newBuilder = {
        email,
        password_hash: passwordHash,
        display_name: displayName,
        handle,
        room_status: "active",
        visibility: "public",
        interests: [],
        tools: [],
      };

      const { data, error } = await supabase
        .from("builders")
        .insert([newBuilder])
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, builder: data });
    }

    // Mock DB Fallback
    if (getBuilderByEmail(email) || getBuilderByHandle(handle)) {
      return NextResponse.json({ error: "이미 존재하는 이메일이거나 핸들입니다." }, { status: 409 });
    }

    const newMockBuilder: Builder = {
      id: `builder-${crypto.randomUUID()}`,
      email,
      password_hash: passwordHash,
      display_name: displayName,
      handle,
      room_status: "active",
      visibility: "public",
      interests: [],
      tools: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    addMockBuilder(newMockBuilder);

    return NextResponse.json({ success: true, builder: newMockBuilder });
  } catch (error: any) {
    return NextResponse.json({ error: "회원가입 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
