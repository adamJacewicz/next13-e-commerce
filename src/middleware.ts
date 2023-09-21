import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const page = request.nextUrl.pathname.split("/").at(-1);
	if (isNaN(Number(page)) || !page) {
		return NextResponse.redirect(new URL("products/1", request.nextUrl.origin));
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/products/:path*",
};
