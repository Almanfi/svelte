import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient;
	namespace App {
		interface Locals {
			user: import("lucia").User | null;
			session: import("lucia").Session | null;
		}
	}
}

export {};
