import { NextResponse } from "next/server";
import { sessionService, logoutUseCase } from "@/core/infrastructure/di/server";

export async function POST(request: Request) {
  await logoutUseCase.execute();
  await sessionService.clear();
  const url = new URL("/login", request.url);
  return NextResponse.redirect(url);
}