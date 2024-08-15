import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    publicRoutes:['/','/parking/:id','/api/webhook/clerk','/api/uploadthing'],
    ignoredRoutes:['/api/webhook/clerk','/api/uploadthing','/api/webhooks(.*)']
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};