import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const audioUrl = searchParams.get("url");

  if (!audioUrl) {
    return new NextResponse("Missing URL", { status: 400 });
  }

  try {
    const response = await fetch(`${audioUrl}`);

    if (!response.ok) {
      return new NextResponse("Failed to fetch audio", {
        status: response.status,
      });
    }

    const contentType = response.headers.get("Content-Type") || "audio/mpeg";
    const contentLength = response.headers.get("Content-Length");
    const blob = await response.blob();

    const headers = {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
    };

    if (contentLength) {
      headers["Content-Length"] = contentLength;
    }

    return new NextResponse(blob, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
